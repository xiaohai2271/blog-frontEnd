import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {GlobalUserService} from '../../services/global-user.service';
import {User} from '../../class/User';
import {ApiService} from '../../api/api.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

    constructor(public gUserService: GlobalUserService, private apiService: ApiService, private messageService: NzMessageService) {
    }

    user: User;
    isCollapsed: boolean = false;
    infoDrawerVisible: boolean = false;
    sayHelloContent: string;
    editInfoModalVisible: boolean = false;
    editInfoFormGroup: FormGroup;

    showInfoDrawer = () => this.infoDrawerVisible = !this.infoDrawerVisible;

    ngOnInit(): void {
        this.gUserService.watchUserInfo({
                complete: () => null,
                error: (err) => null,
                next: data => {
                    console.log('更新user')
                    this.user = data.result
                }
            }
        )
        this.editInfoFormGroup = new FormGroup({
            desc: new FormControl(),
            displayName: new FormControl(),
            email: new FormControl({value: null, disabled: true})
        });
        this.initHelloWords()
    }

    private initHelloWords() {
        const hours = new Date().getHours();
        if (hours < 6) {
            this.sayHelloContent = `夜深了，注意早点休息哦！${this.user.displayName}`
        } else if (hours < 10) {
            this.sayHelloContent = `早上好呀！${this.user.displayName}`
        } else if (hours < 14) {
            this.sayHelloContent = `中午好呀！${this.user.displayName}`
        } else if (hours < 19) {
            this.sayHelloContent = `下午好呀！${this.user.displayName}`
        } else if (hours < 22) {
            this.sayHelloContent = `晚上好呀！${this.user.displayName}`
        } else {
            this.sayHelloContent = `时间不早了，注意休息哦！${this.user.displayName}`
        }
    }

    showEditInfoModal() {
        this.editInfoModalVisible = true;
        this.editInfoFormGroup.patchValue(this.user);
    }

    modalConfirm() {
        const desc = this.editInfoFormGroup.value.desc;
        const displayName = this.editInfoFormGroup.value.displayName;
        this.apiService.updateUserInfo(desc, displayName).subscribe({
            next: data => {
                this.messageService.success('修改信息成功')
                this.gUserService.refreshUserInfo();
            },
            error: err => {
                this.messageService.error(err.msg);
                this.gUserService.refreshUserInfo();
            },
            complete: null
        });
        this.editInfoModalVisible = false;
    }
}
