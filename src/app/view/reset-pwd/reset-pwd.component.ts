import {Component, OnInit} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api/api.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'view-reset-pwd',
    templateUrl: './reset-pwd.component.html',
    styleUrls: ['./reset-pwd.component.less']
})
export class ResetPwdComponent implements OnInit {

    constructor(private message: NzMessageService,
                private router: Router,
                private routerinfo: ActivatedRoute,
                private apiService: ApiService,
                private title: Title) {
        this.title.setTitle('小海博客 | 重置密码 ');
    }

    pwd: string;
    rePwd: string;

    private email: string;
    private verifyId: string;

    iserror: boolean = false;

    ngOnInit(): void {
        this.email = this.routerinfo.snapshot.queryParams.email;
        this.verifyId = this.routerinfo.snapshot.queryParams.verifyId;
        if (this.email == null || this.verifyId == null) {
            this.iserror = true;
        }
    }

    submit() {
        if (this.pwd == null) {
            return;
        }
        if (this.pwd.length > 16) {
            this.message.error('密码过长');
            return;
        }
        if (this.pwd.length < 6) {
            this.message.error('密码过短');
            return;
        }
        if (this.pwd !== this.rePwd) {
            this.message.warning('两次密码不一致');
            return;
        }
        this.apiService.resetPwd(this.verifyId, this.email, this.pwd).subscribe({
            next: data => {
                this.message.success('重置密码成功,5秒后转跳到登录页面。');
                setTimeout(() => {
                    this.router.navigateByUrl('/user/login');
                    // window.location.href = '/login';
                }, 5000);

            },
            error: e => {
                this.message.error(e.msg);
            }
        });
    }

}
