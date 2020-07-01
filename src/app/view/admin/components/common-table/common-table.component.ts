import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef} from '@angular/core';
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

    /**
     * 设置readonly data 因为后面有使用eval 为了安全
     */
    @Input() readonly data: Data<T>[];
    @Input() request: RequestObj;
    @Input() cardTitle: string;
    @Input() template: {
        [fieldValue: string]: {
            temp: TemplateRef<any>,
            param?: { [key: string]: string }
        }
    };
    @Output() pageInfo = new EventEmitter<{ page: number, pageSize: number }>();
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
        const pageValue = this.dataList.pageNum ? this.dataList.pageNum : 1;
        const countValue = this.dataList.pageSize ? this.dataList.pageSize : 10
        this.request.queryParam = {
            page: pageValue,
            count: countValue
        }
        this.pageInfo.emit({page: pageValue, pageSize: countValue})
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


    getValue(index: number, fieldValue: string) {
        let str = `this.dataList.list[${index}].` + fieldValue;
        const regexp = /<|>|=|onload|$|{|}|《/
        str = str.replace(regexp, '');
        // tslint:disable-next-line:no-eval
        const value = eval(str);
        return value !== undefined ? value : '暂无数据';
    }

    getContext = (fieldValue: string, index: number) => {
        const valueData = this.getValue(index, fieldValue);
        let context: { value: string, originValue?: string };
        if (this.template[fieldValue].param) {
            context = {
                value: this.template[fieldValue].param[valueData],
                originValue: valueData
            }
        } else {
            context = {
                value: valueData
            }
        }
        return context;
    }
}
