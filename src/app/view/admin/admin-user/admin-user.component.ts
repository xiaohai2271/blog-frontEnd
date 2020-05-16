import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup} from '@angular/forms';
import {PageList} from '../../../class/HttpReqAndResp';
import {ApiService} from '../../../api/api.service';
import {User} from '../../../class/User';
import {GlobalUserService} from '../../../services/global-user.service';

@Component({
    selector: 'app-admin-user',
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.less']
})
export class AdminUserComponent implements OnInit {

    constructor(private apiService: ApiService, private title: Title, private messageService: NzMessageService,
                private userService: GlobalUserService) {
        this.formGroup = new FormGroup({
            id: new FormControl(null),
            email: new FormControl(''),
            displayName: new FormControl(''),
            emailStatus: new FormControl(null),
            desc: new FormControl(null),
            role: new FormControl(null),
            pwd: new FormControl(''),
        });
        this.userService.watchUserInfo({
            next: data => this.user = data.result,
            error: null,
            complete: null
        })
    }

    pageIndex: number = 1;
    pageSize: number = 10;

    pageList: PageList<User> = new PageList<User>();
    user: User;
    loading: boolean = true;
    modalData = {
        visible: false,
        title: null,
        isEdit: false,
        resetPwd: false
    }
    formGroup: FormGroup;

    ngOnInit(): void {
        this.title.setTitle('小海博客 | 用户管理')
        this.getUser();
    }

    getUser = () => this.apiService.adminUsers(this.pageSize, this.pageIndex).subscribe({
        next: data => this.pageList = data.result,
        complete: () => this.loading = false,
        error: err => this.loading = false
    })

    deleteUser(id) {
        this.loading = true;
        this.apiService.deleteUser(id).subscribe({
            next: data => {
                this.messageService.success('删除成功')
                this.loading = false;
                this.getUser();
            },
            error: err => {
                this.messageService.error(err.msg)
                this.loading = false
            }
        })
    }

    showModal(isEdit: boolean, data: User) {
        this.modalData.visible = true;
        this.modalData.isEdit = isEdit;
        this.modalData.title = isEdit ? '编辑用户' : '查看用户'
        this.formGroup.reset();
        this.formGroup.patchValue(data);
    }

    modalConfirm() {
        this.modalData.visible = false
        this.apiService.adminUpdateUser(this.formGroup.value).subscribe({
            next: data => {
                this.getUser();
                this.messageService.success('修改用户信息成功');
                this.userService.refreshUserInfo();
            }
        })
    }
}
