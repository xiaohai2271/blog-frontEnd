import {Injectable} from '@angular/core';
import {RequestObj} from '../../class/Request';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from '../../utils/local-storage.service';
import {Response} from '../../class/Response';
import {Observable, Observer, Subject} from 'rxjs';
import {ErrDispatch} from '../../class/ErrDispatch';
import {multicast} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient: HttpClient,
                protected localStorageService: LocalStorageService) {
    }

    private errorDispatch: ErrDispatch;

    setErrDispatch(errDispatch: ErrDispatch) {
        this.errorDispatch = errDispatch;
    }

    Service<T>(request: RequestObj) {
        // 设置默认值
        request.contentType = request.contentType == null ? 'application/x-www-form-urlencoded' : 'application/json';
        request.header = {
            'Content-Type': request.contentType
        };
        const token = this.localStorageService.getToken();
        if (token != null) {
            request.header.Authorization = token;
        }
        request.path = this.checkUrl(request);

        let observable: Observable<Response<T>>;
        switch (request.method) {
            case 'GET':
                observable = this.get<Response<T>>(request);
                break;
            case 'DELETE':
                observable = this.delete<Response<T>>(request);
                break;
            case 'PUT':
                observable = this.put<Response<T>>(request);
                break;
            case 'POST':
                observable = this.post<Response<T>>(request);
                break;
        }

        let observer: Observer<Response<T>>;

        const oob = new Observable<Response<T>>(o => observer = o);

        observable.subscribe(o => {
            if (o.code) {
                observer.error(o);
                if (this.errorDispatch) {
                    this.errorDispatch.errHandler(o.code, o.msg, request);
                }
            } else {
                observer.next(o);
            }
            observer.complete();
        });
        return oob;
    }

    private get<T>(request: RequestObj) {
        return this.httpClient.get<T>(request.path,
            {
                headers: request.header,
                withCredentials: true
            });
    }

    private post<T>(request: RequestObj) {
        return this.httpClient.post<T>(request.path, request.data,
            {
                headers: request.header,
                withCredentials: true
            });
    }

    private put<T>(request: RequestObj) {
        return this.httpClient.put<T>(request.path, request.data,
            {
                headers: request.header,
                withCredentials: true
            });
    }

    private delete<T>(request: RequestObj) {
        return this.httpClient.delete<T>(request.path,
            {
                headers: request.header,
                withCredentials: true
            });
    }

    /**
     * 验证并且处理拼接 URl
     * @param req Request
     */
    private checkUrl(req: RequestObj): string {
        let tmpUrl = environment.host;
        if (req.path.length === 0) {
            return tmpUrl;
        }
        if (req.path.substr(0, 1) !== '/') {
            tmpUrl += '/';
        }
        let queryStr = '';
        const keys = req.queryParam == null ? [] : Object.keys(req.queryParam);
        if (keys.length === 0) {
            return tmpUrl + req.path;
        }
        for (const key of keys) {
            queryStr += '&' + key + '=' + req.queryParam[key];
        }
        queryStr = queryStr.substr(1, queryStr.length);
        return tmpUrl + req.path + '?' + queryStr;
    }
}
