import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Data} from '../class/data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    this.host = environment.host;
    const item = localStorage.getItem('token');
    this.token = item == null ? '' : item;
    this.httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: this.token
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
    return this.http.get<Data>(this.getPath(path), this.httpOptions);
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
        ContentType: isJson ? 'application/json' : 'application/x-www-form-urlencoded'
      }),
      withCredentials: true
    };
    let submitBody = '';
    if (!isJson) {
      for (const key in reqBody) {
        // 跳过值为null的参数请求
        if (reqBody[key] == null || reqBody[key] === 'null') {
          continue;
        }
        submitBody = submitBody + '&' + key + '=' + reqBody[key];
      }
      submitBody = submitBody.substring(1);
    }
    return this.http.post<Data>(this.getPath(path), isJson ? reqBody : submitBody, Options);
  }

  /**
   * put 请求
   * @param path 请求路径
   * @param reqBody 请求体
   */
  put(path: string, reqBody: object): Observable<Data> {
    return this.http.put<Data>(this.getPath(path), reqBody, this.httpOptions);
  }

  visit() {
    this.post('/visit', null, true).subscribe(data => {
    });
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

  setToken(t: string) {
    if (t == null) {
      return;
    }
    localStorage.setItem('token', t);
    this.token = t;
  }

  removeToken() {
    localStorage.removeItem('token');
    this.token = ''
  }
}
