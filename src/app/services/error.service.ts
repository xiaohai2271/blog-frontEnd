import {Injectable} from '@angular/core';
import {RequestObj, Response} from '../class/HttpReqAndResp';
import {HttpService} from '../api/http/http.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {ComponentStateService} from './component-state.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private httpService: HttpService, private router: Router,
                private componentStateService: ComponentStateService) {
    }

    private static HTTP_ERROR_COUNT: number = 0;
    private readonly MAINTAIN_PAGE_PREFIX = '/maintain'

    public httpError(err: any) {
        if (!environment.production) {
            console.log('error=>', err)
        }
        ErrorService.HTTP_ERROR_COUNT++;
        // this.httpService.getSubscriptionQueue().map(a => a.unsubscribe())
    }

    public httpException(response: Response<any>) {
        if (!environment.production)
            console.log('exception=>', response)
    }

    public checkConnection() {
        // The HTTP_ERROR_COUNT is start with 1 in this function
        if (ErrorService.HTTP_ERROR_COUNT === 1) {
            const req: RequestObj = {
                path: '/headerInfo',
                method: 'GET',
                url: environment.host + '/headerInfo'
            }
            this.httpService.get(req).subscribe({
                next: data => null,
                error: err => {
                    if (this.componentStateService.currentPath !== this.MAINTAIN_PAGE_PREFIX) {
                        this.router.navigateByUrl(this.MAINTAIN_PAGE_PREFIX)
                    }
                    ErrorService.HTTP_ERROR_COUNT = 0;
                }
            })
        }
    }
}
