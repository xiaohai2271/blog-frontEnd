import {Injectable} from '@angular/core';
import {LoginReq, User} from '../class/User';
import {ApiService} from '../api/api.service';
import {Observable, Observer} from 'rxjs';
import {Response} from '../class/HttpReqAndResp';
import {LocalStorageService} from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private apiService: ApiService,
                private localStorageService: LocalStorageService) {
    }

    private lastRequestTime: number;

    // 存储订阅者
    private userObserverArray: Observer<Response<User>>[] = [];

    watchUserInfo(observer: Observer<Response<User>>) {
        if (this.userObserverArray.indexOf(observer) < 0) this.userObserverArray.push(observer);
        const user = this.localStorageService.getUser();
        // 判断本地缓存的用户信息是否符合要求，符合要求返回本地缓存
        if (this.localStorageService.isLogin() && user && !this.localStorageService.checkNeedNet()) {
            observer.next(new Response<User>(user));
            return {
                unsubscribe() {
                    observer.complete();
                }
            }
        }
        if (this.lastRequestTime && Date.now() - this.lastRequestTime < 1000) {
            return {
                unsubscribe() {
                    observer.complete();
                }
            }
        }
        // 不符合 请求网络数据并更新缓存
        // 向订阅者传数据
        this.lastRequestTime = Date.now();
        const subscription = this.apiService.userInfo().subscribe({
            next: o => {
                this.localStorageService.setUser(o.result);
                observer.next(o);
            },
            error: err => {
                // console.debug('登录过期 token错误 等等');
                if (err.code === -1) {
                    // 请求重复
                    return
                }
                this.localStorageService.removeToken();
                observer.next(new Response<User>(null));
                observer.error(err);
            }
        });
        return {
            unsubscribe() {
                observer.complete();
                subscription.unsubscribe()
            }
        }
    }

    login(loginReq: LoginReq, observer: Observer<Response<User>>) {
        const oob = new Observable<Response<User>>(o => observer = o);
        const subscription = this.apiService.login(loginReq).subscribe({
            next: o => {
                // 登录成功
                this.localStorageService.setToken(o.result.token);
                this.localStorageService.setUser(o.result);
                // this.userObserver.next(o);
                this.userObserverArray.forEach(ob => ob.next(o))
                observer.next(o);
                observer.complete();
            },
            error: err => {
                observer.error(err);
                observer.complete();
            }
        });
        return {
            unsubscribe() {
                observer.complete();
                subscription.unsubscribe();
            }
        };
    }

    logout(observer?: Observer<Response<string>>) {
        // 如果不需要返回消息也ok
        this.apiService.logout().subscribe(data => {
                this.localStorageService.clear();
                this.userObserverArray.forEach(ob => ob.next(new Response<User>(null)))
                if (observer) {
                    observer.next(data);
                    observer.complete();
                }
            },
            error => {
                if (observer) {
                    observer.error(error);
                    observer.complete();
                }
            })
    }
}
