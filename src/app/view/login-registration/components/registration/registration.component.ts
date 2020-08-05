import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ApiService} from '../../../../api/api.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {RequestObj} from '../../../../class/HttpReqAndResp';
import {LoginReq} from '../../../../class/User';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'c-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.less'],
    providers: [ApiService]
})
export class RegistrationComponent implements OnInit {

    constructor(private apiService: ApiService,
                private  nzMessageService: NzMessageService,
                private router: Router,
                private title: Title) {
        this.title.setTitle('小海博客 | 注册');
    }

    imgCodeUrl: string;

    imgCode: string;

    email: string;
    pwd: string;

    submitting: boolean;
    @Output() regStatus = new EventEmitter<boolean>();
    @Output() regAccount = new EventEmitter<LoginReq>();

    ngOnInit() {
        this.imgCodeUrl = environment.host + '/imgCode';
        this.submitting = false;
    }

    changeImg() {
        this.imgCode = '';
        this.imgCodeUrl = environment.host + '/imgCode?t=' + new Date().valueOf();
    }

    // 提交注册
    doRegistration() {
        this.submitting = true;
        // 数据验证
        if (!this.email || !this.pwd) {
            this.nzMessageService.error('邮箱账号和密码不可为空');

            this.submitting = false;
            return;
        }
        const emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        if (!emailReg.test(this.email)) {
            this.nzMessageService.error('邮箱格式不正确');
            this.submitting = false;
            return;
        }
        const pwdReg = /^[\w_-]{6,16}$/;
        if (!pwdReg.test(this.pwd)) {
            this.nzMessageService.error('密码格式不正确');
            this.submitting = false;
            return;
        }
        if (!this.imgCode || this.imgCode.length !== 4) {
            this.nzMessageService.error('验证码不正确');
            this.submitting = false;
            return;
        }
        // 验证验证码
        this.apiService.verifyImgCode(this.imgCode).subscribe(data => {
                // 验证成功  注册
                this.apiService.registration(this.email, this.pwd).subscribe(regData => {
                        localStorage.setItem('e', this.email);
                        localStorage.setItem('p', this.pwd);
                        this.email = '';
                        this.pwd = '';
                        this.imgCode = '';
                        this.submitting = false;
                        this.nzMessageService.success('注册成功，三秒后跳转登录页面');
                        this.regStatus.emit(true);
                        this.regAccount.emit(new LoginReq(this.email, true, this.pwd));
                        setTimeout(() => {
                            if (this.router) {
                                this.router.navigateByUrl('/user/login');
                            }
                        }, 3000);
                    }
                );
            },
        );

    }

    errHandler(code: number, msg: string, request?: RequestObj): void {
        this.nzMessageService.error('reg' + msg);
        this.regStatus.emit(false);
    }
}
