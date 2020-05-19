import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
    CanActivateChild
} from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {User} from '../../class/User';
import {GlobalUserService} from '../../services/global-user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: GlobalUserService, private router: Router) {
    }

    userInfo: User;
    visitCount: number = 0; // 记录一共走过几次canActivate
    private path: string;
    private readonly loginPath: string = '/user/login';
    private observable: Observable<boolean>;

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this.path = state.url.indexOf('?') > 0 ? state.url.substr(0, state.url.indexOf('?')) : state.url;
        this.visitCount++;
        this.observable = new Observable<boolean>(observer => {
            if (!this.userInfo) {
                this.watchUserInfo(observer);
            } else {
                this.checkPath(observer);
            }
        });
        return this.observable;
    }

    watchUserInfo(observer: Observer<boolean>) {
        this.userService.watchUserInfo({
            complete: () => null,
            error: (err) => {
                // 请求重复
                if (err.code !== -1) {
                    observer.next(false);
                    observer.complete();
                    this.router.navigateByUrl(this.loginPath);
                }
            },
            next: data => {
                this.userInfo = data.result;
                this.checkPath(observer);
            }
        })
    }


    checkPath(observer: Observer<boolean>) {
        switch (this.path) {
            case '/admin/article':
            case '/admin/link':
            case '/admin/tag':
            case '/admin/update':
            case '/admin/user':
            case '/admin/visitor':
                if (this.userInfo && this.userInfo.role !== 'admin') {
                    observer.next(false);
                    if (this.visitCount === 1) this.router.navigateByUrl('/admin')
                    observer.complete();
                    return;
                }
        }
        observer.next(true);
        observer.complete();
    }

}
