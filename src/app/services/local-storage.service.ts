import {Injectable} from '@angular/core';
import {Base64} from 'js-base64';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    readonly place = 30 * 1000;

    constructor() {
    }

    // 30s

    getToken(): string {
        const item = this.getItem('token');
        if (!item) {
            return null;
        }
        return 'Bearer ' + item;
    }

    setToken(token: string) {
        const t = new Date().valueOf().toString();
        this.setItem('t', t);
        if (token.startsWith('Bearer')) {
            token = token.replace('Bearer', '');
        }
        if (token.startsWith('bearer')) {
            token = token.replace('bearer', '');
        }
        this.setItem('token', token);
    }

    removeToken() {
        this.removeItem('token');
    }

    isLogin() {
        return this.getToken() != null;
    }

    setItem(key: string, value: any) {
        localStorage.setItem(key, Base64.encode(value));
    }

    getItem(key: string) {
        const item = localStorage.getItem(key);
        let decode;
        try {
            decode = Base64.decode(item);
            return item ? decode : null;
        } catch (e) {
            localStorage.removeItem(key);
            return item;
        }
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
