import {Injectable, Injector} from '@angular/core';
import {RequestObj, Response} from '../class/HttpReqAndResp';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {ComponentStateService} from './component-state.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {HttpService} from '../api/http/http.service';
import {LocalStorageService} from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(/*private httpService: HttpService,*/
                private router: Router,
                private injector: Injector,
                private componentStateService: ComponentStateService,
                private notification: NzNotificationService,
                private localStorageService: LocalStorageService) {
    }

    private static HTTP_ERROR_COUNT: number = 0;
    private readonly MAINTAIN_PAGE_PREFIX = '/maintain'
    private readonly ADMIN_PAGE_PREFIX = '/admin'

    public httpError(err: any, request: RequestObj) {
        if (!environment.production) {
            console.log('error=>', err, request)
        }
        ErrorService.HTTP_ERROR_COUNT++;
        // this.httpService.getSubscriptionQueue().map(a => a.unsubscribe())
    }

    public httpException(response: Response<any>, request: RequestObj) {
        if (!environment.production)
            console.log('exception=>', response, request)
        if (response.code === -1 && response.msg === '重复请求') return
        if (this.componentStateService.currentPath === this.ADMIN_PAGE_PREFIX) {
            this.notification.create('error', `请求失败<${response.code}>`, `${response.msg}`);
        }
        // 3830 token签名错误
        if (response.code === 3830) {
            this.localStorageService.removeToken();
        }
    }

    public checkConnection() {
        // The HTTP_ERROR_COUNT is start with 1 in this function
        if (ErrorService.HTTP_ERROR_COUNT === 1) {
            const req: RequestObj = {
                path: '/headerInfo',
                method: 'GET',
                url: environment.host + '/headerInfo'
            }
            this.injector.get(HttpService).get(req).subscribe({
                next: () => null,
                error: () => {
                    if (this.componentStateService.currentPath !== this.MAINTAIN_PAGE_PREFIX) {
                        this.router.navigateByUrl(this.MAINTAIN_PAGE_PREFIX)
                    }
                    ErrorService.HTTP_ERROR_COUNT = 0;
                }
            })
        }
    }
}
