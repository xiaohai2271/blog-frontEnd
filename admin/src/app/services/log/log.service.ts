import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    constructor(private http: HttpService) {
    }

    logText: string;

    getLog() {
        // @ts-ignore
        const observable = this.http.httpClient.get<string>('https://api.celess.cn/blog.log', {responseType: 'text'});
        observable.subscribe(data => {
            this.logText = data;
        });
        return observable;
    }
}
