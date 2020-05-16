import {Component, OnInit} from '@angular/core';
import {PageList, Response} from '../../../class/HttpReqAndResp';
import {Link} from '../../../class/Link';
import {ApiService} from '../../../api/api.service';
import {NzMessageService} from 'ng-zorro-antd';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-admin-link',
    templateUrl: './admin-link.component.html',
    styleUrls: ['./admin-link.component.less']
})
export class AdminLinkComponent implements OnInit {

    constructor(private apiService: ApiService, private messageService: NzMessageService) {
        this.formGroup = new FormGroup({
            id: new FormControl(null),
            name: new FormControl(null, [Validators.required]),
            url: new FormControl(null, [Validators.required, Validators.pattern(/^(https:\/\/|http:\/\/|)([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)]),
            open: new FormControl(null, [Validators.required]),
            oper: new FormControl(null)
        })
    }

    pageList: PageList<Link> = new PageList<Link>();
    loading: boolean = true;
    pageIndex: number = 1;
    pageSize: number = 10;
    modalVisible: boolean = false;
    modalTitle: string = '';
    formGroup: FormGroup;

    getLinks = () => this.apiService.adminLinks(this.pageSize, this.pageIndex).subscribe({
        next: data => this.pageList = data.result,
        error: () => this.loading = false,
        complete: () => this.loading = false,
    })

    ngOnInit(): void {
        this.getLinks();
    }

    delete(id: number) {
        this.apiService.deleteLink(id).subscribe({
            next: data => {
                this.messageService.success('删除成功');
                this.getLinks();
            },
            error: () => {
                this.loading = false;
                this.messageService.error('删除失败');
            },
            complete: () => this.loading = false,
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
            error: err => this.messageService.success('操作失败,', err.msg),
            complete: () => this.getLinks()
        })
    }

    addLink() {
        this.modalVisible = true;
        this.modalTitle = '新增友链信息';
        this.formGroup.controls.oper.setValue('add')
    }
}
