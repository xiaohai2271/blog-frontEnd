import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {GlobalUserService} from '../../services/global-user.service';
import {User} from '../../class/User';
import {ApiService} from '../../api/api.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

    constructor(public gUserService: GlobalUserService, private apiService: ApiService, private messageService: NzMessageService,
                private router: Router, private localStorageService: LocalStorageService) {
        this.gUserService.watchUserInfo({
                complete: () => null,
                error: (err) => null,
                next: data => {
                    console.log('更新user')
                    this.user = data.result
                    if (data.result) this.initHelloWords()
                }
            }
        );
        this.editInfoFormGroup = new FormGroup({
            desc: new FormControl(),
            displayName: new FormControl(),
            email: new FormControl({value: null, disabled: true})
        });
        this.resetPwdFormGroup = new FormGroup({
            originPwd: new FormControl(null, [Validators.required]),
            newPwd: new FormControl(null, [
                Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(/^[\w_-]{6,16}$/)
            ]),
            newPwdConfirm: new FormControl(null, [
                Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(/^[\w_-]{6,16}$/),
                this.checkSamePwd()
            ]),
        })
    }

    user: User;
    isCollapsed: boolean = false;
    infoDrawerVisible: boolean = false;
    sayHelloContent: string;
    editInfoModalVisible: boolean = false;
    resetPwdModalVisible: boolean = false;
    editInfoFormGroup: FormGroup;
    resetPwdFormGroup: FormGroup;
    noAvatarUrl = 'https://cdn.celess.cn/'
    host: string
    showInfoDrawer = () => this.infoDrawerVisible = !this.infoDrawerVisible;

    logout() {
        this.gUserService.logout();
        this.router.navigateByUrl('/')
    }

    ngOnInit(): void {
        this.host = environment.host;
    }

    checkSamePwd = () => {
        return (control: AbstractControl): { [key: string]: any } | null => {
            console.log('a')
            const newPwd = this.resetPwdFormGroup && this.resetPwdFormGroup.value.newPwd;
            return control.value !== newPwd ? {pwdNotSame: true} : null;
        };
    }
    uploadHeader = (file: UploadFile): object | Observable<{}> => {
        return {Authorization: this.localStorageService.getToken()}
    };

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
        this.infoDrawerVisible = false;
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

    resetPwdConfirm() {
        // this.apiService
        const data = this.resetPwdFormGroup.value;
        this.apiService.setPwd(data.originPwd, data.newPwd, data.newPwdConfirm).subscribe({
            next: respData => {
                this.messageService.success('修改密码成功，请牢记你修改的密码');
                this.gUserService.refreshUserInfo();
            },
            error: err => {
                this.messageService.error('修改密码失败，' + err.msg);
            }
        })
        this.resetPwdModalVisible = false;
    }

    showResetPwdModal() {
        this.resetPwdModalVisible = true;
        this.infoDrawerVisible = false
    }

    avatarUpload(info: any) {
        if (info.type === 'success' && info.file.response.code === 0) {
            const time = new Date().valueOf();
            this.gUserService.refreshUserInfo();
        }
    }
}
