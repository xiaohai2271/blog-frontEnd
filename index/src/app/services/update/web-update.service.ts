import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {UpdateInfo} from '../../class/updateInfo';

@Injectable({
  providedIn: 'root'
})
export class WebUpdateService {

  constructor(public http: HttpService) {
  }

  public updateInfoList: UpdateInfo[];

  public lastestUpdateTime: string;

  // when you fell unhappy,look at the sky, the sun is shining the birds are singing
  // And you? should be smiling
  getUpdateInfo() {
    this.http.get('/webUpdate').subscribe((data: any) => {
      if (data.code === 0) {
        this.updateInfoList = data.result.reverse();
      }
    });
  }

  getLastestUpdateTime() {
    this.http.get('/lastestUpdateTime').subscribe(data => {
      if (data.code === 0) {
        this.lastestUpdateTime = data.result;
      }
    });
  }
}
