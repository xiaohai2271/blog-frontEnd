import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    readonly place = 30 * 1000;

    constructor() {
    }

    // 30s

    getToken(): string {
        const item = localStorage.getItem('token');
        if (!item) {
            return null;
        }
        return 'Bearer ' + atob(item);
    }

    setToken(token: string) {
        const t = new Date().valueOf().toString();
        localStorage.setItem('t', btoa(t));
        if (token.startsWith('Bearer')) {
            token = token.replace('Bearer', '');
        }
        if (token.startsWith('bearer')) {
            token = token.replace('bearer', '');
        }
        localStorage.setItem('token', btoa(token));
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    isLogin() {
        return this.getToken() != null;
    }

    setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string) {
        return localStorage.getItem(key);
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    // setUser(user: User) {
    //     // TODO: 简单加个密
    //     localStorage.setItem('t', new Date().valueOf().toString());
    //     return localStorage.setItem('user', JSON.stringify(user));
    // }
    //
    // getUser(): User {
    //     if (!this.checkNeedNet()) {
    //         return JSON.parse(localStorage.getItem('user'));
    //     }
    // }
    //
    // removeUser() {
    //     return localStorage.removeItem('user');
    // }

    clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return localStorage.removeItem('t');
    }

    // checkNeedNet() {
    //     const t: number = Number.parseInt(localStorage.getItem('t'), 10);
    //     if (isNaN(t) || new Date().valueOf() - t > this.place) {
    //         localStorage.removeItem('t');
    //         localStorage.removeItem('user');
    //         return true;
    //     }
    //     return false;
    // }
}
