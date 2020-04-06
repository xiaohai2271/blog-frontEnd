import {Injectable} from '@angular/core';
import {User} from '../class/User';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {
    }

    // 1分钟
    readonly place = 60 * 1000;

    getToken(): string {
        return localStorage.getItem('token');
    }

    setToken(token: string) {
        localStorage.setItem('t', new Date().valueOf().toString());
        localStorage.setItem('token', token);
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    isLogin() {
        return this.getToken() != null;
    }

    setUser(user: User) {
        // TODO: 简单加个密
        localStorage.setItem('t', new Date().valueOf().toString());
        return localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User {
        if (!this.checkNeedNet()) {
            return JSON.parse(localStorage.getItem('user'));
        }
    }

    removeUser() {
        return localStorage.removeItem('user');
    }

    clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return localStorage.removeItem('t');
    }

    checkNeedNet() {
        const t: number = Number.parseInt(localStorage.getItem('t'), 10);
        if (isNaN(t) || new Date().valueOf() - t > this.place) {
            localStorage.removeItem('t');
            localStorage.removeItem('user');
            return true;
        }
        return false;
    }
}
