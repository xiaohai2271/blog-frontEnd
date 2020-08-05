import {Injectable, Injector} from '@angular/core';
import {RequestObj, Response} from '../../class/HttpReqAndResp';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from '../../services/local-storage.service';
import {Observable, Observer, Subscription} from 'rxjs';
import {ErrorService} from '../../services/error.service';

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    constructor(private httpClient: HttpClient,
                private localStorageService: LocalStorageService,
                private injector: Injector) {
    }

    private subscriptionQueue: Subscription[] = [];

    public getSubscriptionQueue = () => this.subscriptionQueue;

    Service<T>(request: RequestObj) {
        const errorService = this.injector.get(ErrorService);
        request.url = null;
        // 设置默认值
        request.contentType = request.contentType == null ? 'application/x-www-form-urlencoded' : request.contentType;
        request.header = {
            'Content-Type': request.contentType
        };
        const token = this.localStorageService.getToken();
        if (token != null) {
            request.header.Authorization = token;
        }
        request.url = this.checkUrl(request);

        let observable: Observable<HttpResponse<Response<T>>>;
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

        const subscription = observable.subscribe({
            next: o => {
                const tokenFromReps = o.headers.get('Authorization');
                if (tokenFromReps) {
                    this.localStorageService.setToken(tokenFromReps);
                }
                if (o.body.code !== 0) {
                    observer.error(o.body);
                    errorService.httpException(o.body)
                } else {
                    observer.next(o.body);
                }
                observer.complete();
            },
            error: err => {
                errorService.httpError(err);
                errorService.checkConnection();
                this.subscriptionQueue.splice(this.subscriptionQueue.indexOf(subscription), 1)
            },
            complete: () => this.subscriptionQueue.splice(this.subscriptionQueue.indexOf(subscription), 1)
        });
        this.subscriptionQueue.push(subscription);
        return oob;
    }

    get<T>(request: RequestObj) {
        return this.httpClient.get<T>(request.url,
            {
                headers: request.header,
                withCredentials: true,
                observe: 'response'
            });
    }

    post<T>(request: RequestObj) {
        return this.httpClient.post<T>(request.url, request.data,
            {
                headers: request.header,
                withCredentials: true,
                observe: 'response'
            });
    }

    put<T>(request: RequestObj) {
        return this.httpClient.put<T>(request.url, request.data,
            {
                headers: request.header,
                withCredentials: true,
                observe: 'response'
            });
    }

    delete<T>(request: RequestObj) {
        return this.httpClient.delete<T>(request.url,
            {
                headers: request.header,
                withCredentials: true,
                observe: 'response'
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
