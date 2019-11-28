import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Page} from '../../classes/page';
import {Visitor} from '../../classes/visitor';

@Injectable({
    providedIn: 'root'
})
export class VisitorService {

    constructor(public http: HttpService) {
    }

    public pageList: Page<Visitor>[] = [];
    public currentPage: Page<Visitor>;

    public dayVisit: number;
    public totalVisitCount: number;

    private ipLocationList: { ip: string, location: string }[] = [];

    getVisitor(pageNum: number, pageSize: number) {
        const observable = this.http.get(`/admin/visitor/page?count=${pageSize}&page=${pageNum}&showLocation=false`);
        observable.subscribe(data => {
            if (data.code === 0) {
                this.pageList.unshift(data.result);
                this.currentPage = data.result;
            }
        });
    }

    getDayVisitor() {
        this.http.get('/dayVisitCount').subscribe(data => {
            if (data.code === 0) {
                this.dayVisit = data.result;
            }
        });
    }

    getTotalVisitorCount() {
        this.http.get('/visitor/count').subscribe(data => {
            this.totalVisitCount = data.result;
        });
    }


    getIp(ip: string) {
        const location = this.exist(ip);
        if (location) {
            return location;
        }
        const observable = this.http.get(`/ip/${ip}`);
        observable.subscribe(data => {
            if (data.code === 0) {
                this.ipLocationList.unshift(data.result);
            }
        });
        return observable;
    }

    getLocalIp() {
        return this.http.get('/ip');
    }

    private exist(ip): string {
        if (this.ipLocationList.length === 0) {
            return null;
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.ipLocationList.length; i++) {
            if (this.ipLocationList[i].ip === ip) {
                return this.ipLocationList[i].location;
            }
        }
    }
}
