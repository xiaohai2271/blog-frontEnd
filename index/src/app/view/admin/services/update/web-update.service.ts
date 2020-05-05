import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {UpdateInfo} from '../../classes/updateInfo';
import {Page} from '../../classes/page';

@Injectable({
    providedIn: 'root'
})
export class WebUpdateService {

    constructor(public http: HttpService) {
    }

    public updateInfoList: Page<UpdateInfo>;

    public lastestUpdateTime: string;

    getUpdateInfo(pageNum: number, pageSize: number) {
        const observable = this.http.get(`/webUpdate/pages?page=${pageNum}&count=${pageSize}`);
        observable.subscribe((data: any) => {
            if (data.code === 0) {
                this.updateInfoList = data.result;
            }
        });
        return observable;
    }

    getLastestUpdateTime() {
        this.http.get('/lastestUpdateTime').subscribe(data => {
            if (data.code === 0) {
                this.lastestUpdateTime = data.result;
            }
        })
    }


    update(submitBody: { id: number, info: string }) {
        return this.http.put('/admin/webUpdate/update', submitBody, false);
    }

    create(infoStr: string) {
        return this.http.post('/admin/webUpdate/create', {info: infoStr}, false);
    }

    delete(id: number) {
        return this.http.delete(`/admin/webUpdate/del/${id}`);
    }
}
