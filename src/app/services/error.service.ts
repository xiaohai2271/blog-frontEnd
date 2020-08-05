import {Injectable, Injector} from '@angular/core';
import {Response} from '../class/HttpReqAndResp';
import {HttpService} from '../api/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private httpService: HttpService) {
    }

    public httpError(err: any) {
        console.log('error=>', err)
        // this.httpService.getSubscriptionQueue().map(a => a.unsubscribe())
    }

    public httpException(response: Response<any>) {
        console.log('exception=>', response)
    }


}
