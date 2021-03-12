import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestObj} from '../../../class/HttpReqAndResp';
import {ApiService} from '../../../api/api.service';
import {User} from '../../../class/User';
import {GlobalUserService} from '../../../services/global-user.service';
import {Data} from '../components/common-table/data';

@Component({
    selector: 'app-admin-user',
    templateUrl: './admin-user.component.html'
})
export class AdminUserComponent implements OnInit {

    user: User;
    modalData = {
        visible: false,
        title: null,
        isEdit: false,
        resetPwd: false
    };
    formGroup: FormGroup;
    headData: Data<User>[];
    request: RequestObj;

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
        });
    }

    ngOnInit(): void {
        this.title.setTitle('小海博客 | 用户管理');
        this.request = {
            path: '/admin/users',
            method: 'GET',
            queryParam: {
                count: 1,
                page: 10
            }
        };
        this.headData = [
            {fieldValue: 'id', title: '主键', primaryKey: true, show: false},
            {fieldValue: 'email', title: '邮箱', show: true},
            {fieldValue: 'displayName', title: '昵称', show: true},
            {fieldValue: 'role', title: '角色', show: true},
            {fieldValue: 'emailStatus', title: '邮箱验证状态', show: true},
            {fieldValue: 'desc', title: '描述', show: false},
            {fieldValue: 'avatarImgUrl', title: '头像', show: false},
            {fieldValue: 'recentlyLandedDate', title: '最近登录日期', show: false},
            {
                fieldValue: '', title: '操作', show: true, isActionColumns: true,
                action: [
                    {name: '查看', click: data => this.showModal(false, data)},
                    {name: '编辑', color: 'blue', click: data => this.showModal(true, data)},
                    {name: '删除', color: 'red', needConfirm: true, click: data => this.deleteUser(data.id)}
                ]
            },
        ];
    }


    deleteUser(id) {
        this.apiService.deleteUser(id).subscribe({
            next: data => this.messageService.success('删除成功'),
            error: err => this.messageService.error(err.msg)
        });
    }

    showModal(isEdit: boolean, data: User) {
        this.modalData.visible = true;
        this.modalData.isEdit = isEdit;
        this.modalData.title = isEdit ? '编辑用户' : '查看用户';
        this.formGroup.reset();
        this.formGroup.patchValue(data);
    }

    modalConfirm() {
        this.modalData.visible = false;
        this.apiService.adminUpdateUser(this.formGroup.value).subscribe({
            next: data => {
                this.messageService.success('修改用户信息成功');
                this.userService.refreshUserInfo();
            }
        });
    }
}
