import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef} from '@angular/core';
import {Data} from './data';
import {PageList, RequestObj} from '../../../../class/HttpReqAndResp';
import {HttpService} from '../../../../api/http/http.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
    selector: 'common-table',
    templateUrl: './common-table.component.html',
    styleUrls: ['./common-table.component.less']
})
export class CommonTableComponent<T> implements OnInit, OnChanges {

    constructor(private httpService: HttpService) {

    }

    /**
     * 设置readonly data 因为后面有使用eval 为了安全
     */
    @Input() private headData: Data<T>[];
    @Input() request: RequestObj;
    @Input() cardTitle: string | null;
    @Input() template: {
        [fieldValue: string]: {
            temp: TemplateRef<any>,
            param?: { [key: string]: string }
        }
    };
    @Output() pageInfo = new EventEmitter<{ page: number, pageSize: number }>();
    loading: boolean = true;

    dataList: PageList<T> = new PageList<T>();
    settingModalVisible: boolean = false;
    filedData: Data<T>[];
    editData: Data<T>[];
    changed: boolean = false;
    visibleFieldLength: number = 0;

    ngOnInit(): void {
        if (localStorage.getItem(this.request.path)) {
            this.filedData = JSON.parse(localStorage.getItem(this.request.path));
            this.changed = true;
        } else {
            this.filedData = JSON.parse(JSON.stringify(this.headData));
        }
        this.calculateVisibleFieldLength();

        if (!this.template) this.template = {}
        this.headData.forEach(dat => {
            if (!dat.action) return;
            dat.action.forEach(act => {
                if (!act.hover) {
                    act.hover = () => null;
                }
            })
        });
        if (!this.request || !this.request.path) return
        this.getData();
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
        return this.httpService.Service<PageList<T>>(this.request).subscribe({
            next: resp => {
                this.dataList = resp.result;
                setTimeout(() => this.loading = false, 10)
            },
            error: err => this.loading = false
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.request && !changes.request.isFirstChange()) {
            console.log(changes.request)
            this.request = changes.request.currentValue;
            this.getData().unsubscribe();
            this.getData();
        }
    }


    getValue(index: number, fieldValue: string): string {
        let value = this.dataList.list[index];
        try {
            for (const key of fieldValue.split('.')) value = value[key]
        } catch (e) {
            // ignore
        }
        return (value != null) ? value.toString() : '————';
    }

    getContext = (fieldValue: string, index: number) => {
        const valueData = this.getValue(index, fieldValue);
        let context: { value: string, originValue?: string, data: T };
        if (this.template[fieldValue].param) {
            context = {
                value: this.template[fieldValue].param[valueData],
                originValue: valueData,
                data: this.dataList.list[index]
            }
        } else {
            context = {
                value: valueData,
                data: this.dataList.list[index]
            }
        }
        return context;
    }

    showFieldSetting() {
        this.settingModalVisible = true;
        this.editData = JSON.parse(JSON.stringify(this.filedData));
    }

    ok() {
        this.calculateVisibleFieldLength();
        this.settingModalVisible = !this.settingModalVisible;
        if (JSON.stringify(this.filedData) === JSON.stringify(this.editData)) {
            return;
        }
        this.dataList = JSON.parse(JSON.stringify(this.dataList));
        this.filedData = this.editData;
        localStorage.setItem(this.request.path, JSON.stringify(this.filedData))
        this.changed = true;
    }

    drop(event: CdkDragDrop<T, any>) {
        moveItemInArray(this.editData, event.previousIndex, event.currentIndex);
    }

    reset = () => {
        localStorage.removeItem(this.request.path);
        this.filedData = JSON.parse(JSON.stringify(this.headData))
        this.editData = JSON.parse(JSON.stringify(this.headData));
        this.changed = false;
        this.calculateVisibleFieldLength();
    }

    cancel = () => this.settingModalVisible = false;

    calculateVisibleFieldLength = () => this.filedData.filter(value => value.show).length;
}
