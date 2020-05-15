import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../class/User';
import {GlobalUserService} from '../../services/global-user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: GlobalUserService, private router: Router) {
        userService.watchUserInfo({
            complete: () => null,
            error: (err) => {
                // 请求重复
                console.log(err);
                if (err.code !== -1) {
                    this.userInfo = null;
                    this.router.navigateByUrl(this.loginPath);
                }
            },
            next: data => {
                this.userInfo = data.result
            }
        })
    }

    userInfo: User;
    private path: string;
    private readonly loginPath: string = '/user/login';

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const path = state.url.indexOf('?') > 0 ? state.url.substr(0, state.url.indexOf('?')) : state.url;
        this.path = path
        if (path.split('/')[1] === 'admin' && !this.userInfo) {
            this.router.navigateByUrl(this.loginPath);
            return false;
        }
        switch (path) {
            case '/admin/article':
            case '/admin/category':
            case '/admin/link':
            case '/admin/tag':
            case '/admin/update':
            case '/admin/user':
            case '/admin/visitor':
                if (this.userInfo.role !== 'admin') {
                    return false;
                }
        }
        return true;
    }

}
