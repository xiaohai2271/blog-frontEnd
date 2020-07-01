import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
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
     * 设置readonly data 因为后面有使用eval 为了安全 TODO
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


    getValue(index: number, fieldValue: string) {
        // todo: 过滤
        // tslint:disable-next-line:no-eval
        const value = eval(`this.dataList.list[${index}].` + fieldValue);
        return value ? value : '暂无数据';
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
