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
        this.httpService.Service<PageList<T>>(this.request).subscribe(resp => {
            this.dataList = resp.result;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

}
