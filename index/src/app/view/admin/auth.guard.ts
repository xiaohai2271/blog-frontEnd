import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../class/User';
import {UserService} from '../../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService) {
        userService.watchUserInfo({
            complete: () => null,
            error: (err) => null,
            next: data => {
                this.userInfo = data.result
                console.log(this.path);
                // todo ：用户信息更新时 重新判断下path
            }
        })
    }

    userInfo: User;
    private path: string;

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const path = state.url.indexOf('?') > 0 ? state.url.substr(0, state.url.indexOf('?')) : state.url;
        this.path = path
        switch (path) {
            case '/admin/article':
            case '/admin/category':
            case '/admin/link':
            case '/admin/tag':
            case '/admin/update':
            case '/admin/user':
            case '/admin/visitor':
                if (!this.userInfo || this.userInfo.role !== 'admin') return false;
        }
        return true;
    }

}
