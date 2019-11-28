import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Tag} from '../../classes/tag';
import {Page} from '../../classes/page';
import {exist} from '../../utils/dataUtil';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(public http: HttpService) {
    }

    tagPages: Page<Tag>[] = [];
    currentTagPage: Page<Tag>;

    getTags(pageNum: number, pageSize: number) {
        const exist1 = exist<Tag>(pageNum, pageSize, this.tagPages);
        if (exist1) {
            exist1.subscribe(data => {
                this.currentTagPage = data;
            });
            return exist1;
        }
        const observable = this.http.get(`/tags?count=${pageSize}&page=${pageNum}`);
        observable.subscribe(data => {
            if (data.code === 0) {
                this.currentTagPage = data.result;
                this.tagPages.unshift(data.result);
            }
        });
    }

    update(id: number, name: string) {
        return this.http.put(`/admin/tag/update?id=${id}&name=${name}`, null);
    }

    delete(id: number) {
        return this.http.delete(`/admin/tag/del?id=${id}`);
    }

}
