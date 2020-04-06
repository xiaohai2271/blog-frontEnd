import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../../../../api/api.service';
import {LoginReq} from '../../../../class/LoginReq';
import {LocalStorageService} from '../../../../utils/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRegistrationService} from '../../service/login-registration.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'c-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    constructor(private nzMessageService: NzMessageService,
                private apiService: ApiService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private loginRegistrationService: LoginRegistrationService,
                private title: Title) {
        this.title.setTitle('小海博客 | 登录 ');
    }

    submitting: boolean = false;

    loginReq: LoginReq = new LoginReq(null, true, null);
    @Output() loginStatus = new EventEmitter<boolean>();
    @Input() showSendEmail: boolean = true;

    private url: string;

    ngOnInit() {
        this.url = this.activatedRoute.snapshot.queryParamMap.get('url');
        this.loginReq.email = localStorage.getItem('e');
        this.loginReq.password = localStorage.getItem('p');
        localStorage.removeItem('e');
        localStorage.removeItem('p');
    }

    doLogin() {
        this.submitting = true;
        const emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        const pwdReg = /^[\w_-]{6,16}$/;
        if (!this.loginReq.email || !emailReg.test(this.loginReq.email)) {
            this.submitting = false;
            this.nzMessageService.error('邮箱格式不正确');
            return;
        }
        if (!this.loginReq.password || !pwdReg.test(this.loginReq.password)) {
            this.submitting = false;
            this.nzMessageService.error('密码格式不正确');
            return;
        }

        this.apiService.login(this.loginReq).subscribe(
            data => {
                this.submitting = false;
                this.nzMessageService.success('登录成功，欢迎你' + data.result.displayName);
                this.loginStatus.emit(true);
                if (this.url) {
                    this.router.navigateByUrl(this.url);
                } else {
                    window.location.href = '/admin/';
                }
            }, error => {
                this.nzMessageService.error(error.msg);
                this.submitting = false;
                this.loginStatus.emit(false);
            }
        );
    }

    sendEmail() {
        this.loginRegistrationService.showModal = true;
    }
}
