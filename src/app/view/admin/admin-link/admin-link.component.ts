import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestObj, Response} from '../../../class/HttpReqAndResp';
import {Link} from '../../../class/Link';
import {ApiService} from '../../../api/api.service';
import {NzMessageService} from 'ng-zorro-antd';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {CommonTableComponent} from '../components/common-table/common-table.component';
import {Data} from '../components/common-table/data';

@Component({
    selector: 'app-admin-link',
    templateUrl: './admin-link.component.html'
})
export class AdminLinkComponent implements OnInit {

    constructor(private apiService: ApiService, private messageService: NzMessageService, private title: Title) {
        this.title.setTitle('小海博客 | 友链管理');
        this.formGroup = new FormGroup({
            id: new FormControl(null),
            name: new FormControl(null, [Validators.required]),
            url: new FormControl(null, [Validators.required, Validators.pattern(/^(https:\/\/|http:\/\/|)([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)]),
            open: new FormControl(null, [Validators.required]),
            oper: new FormControl(null)
        })
    }


    modalVisible: boolean = false;
    modalTitle: string = '';
    formGroup: FormGroup;
    request: RequestObj;
    @ViewChild('commonTableComponent') commonTableComponent: CommonTableComponent<Link>
    headData: Data<Link>[];

    ngOnInit(): void {
        this.request = {
            path: '/admin/links',
            method: 'GET',
            queryParam: {
                count: 10,
                page: 1
            }
        }
        this.headData = [
            {title: '主键', fieldValue: 'id', show: false, primaryKey: true},
            {title: '友链名称', fieldValue: 'name', show: true},
            {title: '友链地址', fieldValue: 'url', show: true},
            {title: '是否可见', fieldValue: 'open', show: true},
            {title: '描述', fieldValue: 'desc', show: false},
            {title: '图标', fieldValue: 'iconPath', show: false},
            {title: '状态', fieldValue: 'delete', show: true},
            {
                title: '操作', fieldValue: '', show: true, isActionColumns: true, action: [
                    {name: '访问', click: (data) => window.open(data.url)},
                    {name: '编辑', click: (data) => this.showEdit(data)},
                    {name: '删除', color: 'red', needConfirm: true, click: (data) => this.delete(data.id)},
                ]
            },
        ];
    }

    delete(id: number) {
        this.apiService.deleteLink(id).subscribe({
            next: data => {
                this.messageService.success('删除成功');
                this.commonTableComponent.getData();
            },
            error: () => {
                this.messageService.error('删除失败');
            },
            complete: () => null,
        })
    }

    showEdit(data: Link) {
        this.modalVisible = true;
        this.modalTitle = '编辑友链信息';
        this.formGroup.patchValue(data);
        this.formGroup.controls.oper.setValue('edit')
    }

    modalConfirm() {
        this.modalVisible = false;
        const linkReq: Link = new Link();
        linkReq.name = this.formGroup.value.name;
        linkReq.url = this.formGroup.value.url;
        linkReq.open = this.formGroup.value.open;
        // 暂时设置未空
        linkReq.desc = '';
        linkReq.iconPath = '';
        const oper = this.formGroup.value.oper;
        let observable: Observable<Response<Link>>;
        if (oper === 'edit') {
            linkReq.id = this.formGroup.value.id;
            observable = this.apiService.updateLink(linkReq);
        } else if (oper === 'add') {
            observable = this.apiService.createLink(linkReq);
        }
        observable.subscribe({
            next: data => this.messageService.success('操作成功'),
            error: err => this.messageService.error('操作失败,' + err.msg),
            complete: () => this.commonTableComponent.getData()
        })
    }

    addLink() {
        this.modalVisible = true;
        this.modalTitle = '新增友链信息';
        this.formGroup.reset();
        this.formGroup.controls.oper.setValue('add')
    }
}
