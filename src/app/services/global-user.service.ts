import {Injectable} from '@angular/core';
import {LoginReq, User} from '../class/User';
import {ApiService} from '../api/api.service';
import {Observable, Observer, Subscription} from 'rxjs';
import {Response} from '../class/HttpReqAndResp';
import {LocalStorageService} from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalUserService {

    constructor(private apiService: ApiService,
                private localStorageService: LocalStorageService) {
    }

    private lastRequestTime: number;
    private userInfo: User = null;

    // 存储订阅者
    private userObserverArray: Observer<Response<User>>[] = [];

    private multicastArray: Observer<Response<User>>[] = [];

    watchUserInfo(observer: Observer<Response<User>>) {
        if (this.userObserverArray.indexOf(observer) < 0) this.userObserverArray.push(observer);
        this.multicastArray = [...this.userObserverArray];
        let subscription: Subscription = null;
        const unsubscribe = () => {
            this.userObserverArray.splice(this.userObserverArray.indexOf(observer), 1);
            observer.complete();
            if (subscription) subscription.unsubscribe();
        };
        if (this.lastRequestTime && Date.now() - this.lastRequestTime < 3000) {
            if (this.userInfo && this.multicastArray.length) {
                this.broadcast()
                this.lastRequestTime = Date.now();
            }
            return {unsubscribe}
        }
        // 获取数据
        subscription = this.getUserInfoFromServer();
        return {unsubscribe}
    }

    // 刷新用户信息
    refreshUserInfo(): void {
        this.multicastArray = [...this.userObserverArray];
        this.getUserInfoFromServer();
    }

    login(loginReq: LoginReq, observer: Observer<Response<User>>) {
        this.multicastArray = [...this.userObserverArray];
        const oob = new Observable<Response<User>>(o => observer = o);
        const subscription = this.apiService.login(loginReq).subscribe({
            next: o => {
                // 登录成功
                this.localStorageService.setToken(o.result.token);
                // this.localStorageService.setUser(o.result);
                // this.userObserver.next(o);
                this.userInfo = o.result;
                this.broadcast()
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
        this.userInfo = null;
        this.multicastArray = [...this.userObserverArray];
        // 如果不需要返回消息也ok
        this.apiService.logout().subscribe(data => {
                this.localStorageService.clear();
                this.broadcast()
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

    getUserInfoFromServer(observer?: Observer<Response<User>>) {
        return this.apiService.userInfo().subscribe({
            next: o => {
                this.lastRequestTime = Date.now();
                this.userInfo = o.result;
                // this.localStorageService.setUser(o.result);
                this.broadcast()
                if (observer) {
                    observer.next(o);
                    observer.complete();
                }
                // this.requested = false;
            },
            error: err => {
                // console.debug('登录过期 token错误 等等');
                if (observer) {
                    observer.error(err);
                    observer.complete();
                }

                if (err.code === -1) {
                    // 请求重复
                    return
                }
                // this.requested = false;
                // this.localStorageService.removeToken();
                this.multicastArray.forEach(ob => ob.next(new Response<User>(this.userInfo)))
                this.multicastArray.forEach(ob => ob.error(err))
                this.multicastArray.splice(0, this.multicastArray.length);

            }
        });
    }

    private broadcast() {
        this.multicastArray.forEach(ob => ob.next(new Response<User>(this.userInfo)))
        this.multicastArray.splice(0, this.multicastArray.length);
    }
}
