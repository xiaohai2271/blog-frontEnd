import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Data} from './data';
import {PageList, RequestObj} from '../../../../class/HttpReqAndResp';
import {HttpService} from '../../../../api/http/http.service';

@Component({
    selector: 'app-common-table',
    templateUrl: './common-table.component.html',
    styleUrls: ['./common-table.component.less']
})
export class CommonTableComponent<T> implements OnInit, OnChanges {

    constructor(private httpService: HttpService) {

    }

    @Input() data: Data<T>[]
    @Input() request: RequestObj
    @Input() title: string
    loading: boolean = true;

    dataList: PageList<T> = new PageList<T>();

    ngOnInit(): void {
        this.getData();
        this.data.forEach(dat => {
            if (!dat.action) return;
            dat.action.forEach(act => {
                if (!act.hover) {
                    act.hover = () => null;
                }
            })
        })
    }

    getData = () => {
        this.loading = true;
        this.request.queryParam = {
            page: this.dataList.pageNum ? this.dataList.pageNum : 1,
            count: this.dataList.pageSize ? this.dataList.pageSize : 10
        }
        this.httpService.Service<PageList<T>>(this.request).subscribe({
            next: resp => {
                this.dataList = resp.result;
                this.loading = false;
            },
            error: err => this.loading = false
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

}
