import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api/api.service';
import {LoginRegistrationService} from './service/login-registration.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'view-login-registration',
    templateUrl: './login-registration.component.html',
    styleUrls: ['./login-registration.component.less']
})
export class LoginRegistrationComponent implements OnInit {

    constructor(private apiService: ApiService,
                public loginRegistrationService: LoginRegistrationService,
                private nzMessageService: NzMessageService) {
    }

    picUrl: string = '';
    email: string;
    submitting: boolean = false;

    ngOnInit() {
        this.apiService.bingPic().subscribe(data => {
            this.picUrl = data.result;
        });
    }

    send() {
        this.submitting = true;
        if (!this.email || this.email.length === 0) {
            this.submitting = false;
            this.nzMessageService.warning('邮箱不可为空');
            return;
        }
        this.apiService.sendResetPwdEmail(this.email).subscribe(data => {
            this.submitting = false;
            this.nzMessageService.success('发送成功');
            this.loginRegistrationService.showModal = false;
        }, error => {
            this.nzMessageService.error(error.msg);
            this.submitting = false;
        });
    }

}
