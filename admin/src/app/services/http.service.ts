import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Data} from '../classes/data';
import {reqBody2Str} from '../utils/dataUtil';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(public httpClient: HttpClient) {
        this.host = environment.host;
        const item = localStorage.getItem('token');
        this.token = item == null ? '' : item;
        this.httpOptions = {
            headers: new HttpHeaders({
                Accept: '*/*',
                Authorization: this.token,
            }),
            withCredentials: true
        };
    }

    // 请求的主机地址
    public host: string;
    private token: string;

    /**
     * http请求配置
     */
    private httpOptions: object;

    /**
     * get 请求
     * @param path 路径
     */
    get(path: string): Observable<Data> {
        return this.httpClient.get<Data>(this.getPath(path), this.httpOptions);
    }

    /**
     * post请求
     * @param path 路径
     * @param reqBody 请求体
     * @param isJson 请求数据是否是json格式
     */
    post(path: string, reqBody: object, isJson: boolean): Observable<Data> {
        const Options = {
            headers: new HttpHeaders({
                Accept: '*/*',
                Authorization: this.token,
                'Content-Type': isJson ? 'application/json' : 'application/x-www-form-urlencoded'
            }),
            withCredentials: true
        };
        return this.httpClient.post<Data>(this.getPath(path), isJson ? reqBody : reqBody2Str(reqBody), Options);
    }

    /**
     * put 请求
     * @param path 请求路径
     * @param reqBody 请求体
     * @param isJson 是否发生json格式数据到服务器
     */
    put(path: string, reqBody: object, isJson: boolean = false): Observable<Data> {
        const Options = {
            headers: new HttpHeaders({
                Accept: '*/*',
                Authorization: this.token,
                'Content-Type': isJson ? 'application/json' : 'application/x-www-form-urlencoded'
            }),
            withCredentials: true
        };
        return this.httpClient.put<Data>(this.getPath(path), isJson ? reqBody : reqBody2Str(reqBody), Options);
    }

    /**
     * delete 请求
     * @param path 请求路径
     */
    delete(path: string): Observable<Data> {
        return this.httpClient.delete<Data>(this.getPath(path), this.httpOptions);
    }

    /**
     * 检查path 并拼接
     * @param path 请求路径
     * @return 拼接后的url
     */
    private getPath(path: string): string {
        if (path == null || path.length === 0 || path.substr(0, 1) !== '/') {
            throw new Error('路径不合法');
        }
        return this.host + path;
    }

    removeToken() {
        localStorage.removeItem('token');
        this.token = null;
    }
}
