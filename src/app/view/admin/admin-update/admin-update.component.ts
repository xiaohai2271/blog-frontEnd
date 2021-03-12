import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {ApiService} from '../../../api/api.service';
import {RequestObj, Response} from '../../../class/HttpReqAndResp';
import {UpdateInfo} from '../../../class/UpdateInfo';
import {Data} from '../components/common-table/data';

@Component({
    selector: 'app-admin-update',
    templateUrl: './admin-update.component.html'
})
export class AdminUpdateComponent implements OnInit {


    modalData = {
        visible: false,
        content: null,
        id: null,
        title: null
    };
    headData: Data<UpdateInfo>[];
    request: RequestObj;

    constructor(private apiService: ApiService, private nzMessage: NzMessageService, private title: Title) {
    }

    ngOnInit(): void {
        this.title.setTitle('小海博客 | 更新信息管理');
        this.headData = [
            {fieldValue: 'id', show: false, title: '主键', primaryKey: true},
            {fieldValue: 'info', show: true, title: '更新内容'},
            {fieldValue: 'time', show: true, title: '更新日期'},
            {
                fieldValue: '', show: true, title: '操作', isActionColumns: true, action: [
                    {name: '编辑', click: data => this.showModal(data)},
                    {name: '删除', color: 'red', needConfirm: true, click: data => this.deleteUpdateInfo(data.id)}
                ]
            }
        ];
        this.request = {
            path: '/webUpdate/pages',
            method: 'GET',
            queryParam: {
                count: 1,
                page: 10,
            }
        };
    }


    deleteUpdateInfo(id) {
        this.apiService.deleteWebUpdateInfo(id).subscribe({
            next: data => this.nzMessage.success('删除成功'),
            error: err => this.nzMessage.error(err.msg)
        });
    }

    confirm() {
        this.modalData.visible = false;
        let observable: Observable<Response<UpdateInfo>>;
        if (this.modalData.id) {
            observable = this.apiService.updateWebUpdateInfo(this.modalData.id, this.modalData.content);
        } else {
            observable = this.apiService.createWebUpdateInfo(this.modalData.content);
        }
        observable.subscribe({
            next: data => this.nzMessage.success('操作成功'),
            error: err => this.nzMessage.error(err.msg)
        });
    }

    showModal(data?: UpdateInfo) {
        this.modalData.id = null;
        this.modalData.title = '新增更新信息';
        this.modalData.content = null;
        if (data) {
            this.modalData.id = data.id;
            this.modalData.content = data.info;
            this.modalData.title = '编辑更新信息';
        }
        this.modalData.visible = true;
    }
}
