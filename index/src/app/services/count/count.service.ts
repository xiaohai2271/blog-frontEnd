import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Count} from '../../class/count';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(public http: HttpService) {
  }

  count: Count;

  getCount() {
    const observable = this.http.get('/counts');
    observable.subscribe((data: any) => {
      if (data.code === 0) {
        this.count = data.result;
      }
    });
    return observable;
  }
}
