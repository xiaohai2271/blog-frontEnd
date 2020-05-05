import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Link} from '../../classes/link';
import {Page} from '../../classes/page';

@Injectable({
    providedIn: 'root'
})
export class LinkService {

    constructor(public http: HttpService) {
    }

    // 不采取存储page[] :: 数据量较少
    public currentPage: Page<Link>;

    getLinks(pageNum: number, pageSize: number) {
        const observable = this.http.get(`/admin/links?page=${pageNum}&count=${pageSize}`);
        observable.subscribe(data => {
            if (data.code === 0) {
                this.currentPage = data.result;
            }
        });
        return observable;
    }

    update(submitBody: Link) {
        return this.http.put('/admin/links/update', submitBody, true);
    }

    create(submitBody: Link) {
        submitBody.id = null;
        return this.http.post('/admin/links/create', submitBody, true);
    }

    delete(id) {
        return this.http.delete(`/admin/links/del/${id}`);
    }
}
