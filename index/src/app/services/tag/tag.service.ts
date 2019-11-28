import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Tag} from '../../class/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(public http: HttpService) {
  }

  tagCloudList: Tag[];

  getTagCloud() {
    const observable = this.http.get('/tags/nac');
    observable.subscribe((data: any) => {
      if (data.code === 0) {
        this.tagCloudList = data.result;
      }
    });
    return observable;
  }


}
