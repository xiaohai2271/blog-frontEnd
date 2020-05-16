import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {ApiService} from '../../../api/api.service';
import {PageList, Response} from '../../../class/HttpReqAndResp';
import {UpdateInfo} from '../../../class/UpdateInfo';

@Component({
    selector: 'app-admin-update',
    templateUrl: './admin-update.component.html',
    styleUrls: ['./admin-update.component.less']
})
export class AdminUpdateComponent implements OnInit {


    constructor(private apiService: ApiService, private nzMessage: NzMessageService, private title: Title) {
    }

    pageIndex: number = 1;
    pageSize: number = 10;

    pageList: PageList<UpdateInfo> = new PageList();

    loading: boolean = true;

    modalData = {
        visible: false,
        content: null,
        id: null,
        title: null
    };

    ngOnInit(): void {
        this.title.setTitle('小海博客 | 更新信息管理')
        this.getUpdateInfo();
    }

    getUpdateInfo = () => this.apiService.webUpdatePage(this.pageSize, this.pageIndex).subscribe({
        next: data => this.pageList = data.result,
        complete: () => this.loading = false,
        error: err => this.loading = false
    })


    deleteUpdateInfo(id) {
        this.loading = true;
        this.apiService.deleteWebUpdateInfo(id).subscribe({
            next: data => {
                this.nzMessage.success('删除成功')
                this.loading = false;
                this.getUpdateInfo();
            },
            error: err => {
                this.nzMessage.error(err.msg)
                this.loading = false
            }
        })
    }

    confirm() {
        this.loading = true;
        this.modalData.visible = false;
        let observable: Observable<Response<UpdateInfo>>
        if (this.modalData.id) {
            observable = this.apiService.updateWebUpdateInfo(this.modalData.id, this.modalData.content)
        } else {
            observable = this.apiService.createWebUpdateInfo(this.modalData.content)
        }
        observable.subscribe({
            next: data => {
                this.nzMessage.success('操作成功')
                this.loading = false;
                this.getUpdateInfo();
            },
            error: err => {
                this.nzMessage.error(err.msg)
                this.loading = false
            }
        })
        console.log(this.modalData);
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
