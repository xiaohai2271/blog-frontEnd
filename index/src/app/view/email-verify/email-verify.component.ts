import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api/api.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'view-email-verify',
    templateUrl: './email-verify.component.html',
    styleUrls: ['./email-verify.component.less']
})
export class EmailVerifyComponent implements OnInit {

    constructor(private titleService: Title,
                private router: Router,
                public routerinfo: ActivatedRoute,
                private apiService: ApiService) {
        titleService.setTitle('小海博客 | 邮箱验证');
    }

    type: string = 'info';
    message: string = '正在验证，请稍等';
    desc: string = '';


    private email: string;
    private verifyId: string;

    ngOnInit(): void {
        this.email = this.routerinfo.snapshot.queryParams.email;
        this.verifyId = this.routerinfo.snapshot.queryParams.verifyId;
        if (this.email == null || this.verifyId == null) {
            this.type = 'warning';
            this.message = '数据不全';
            this.desc = '链接可能被修改了，请重新点击邮箱中的链接，或者重新发送邮件';
            return;
        }
        this.apiService.emailVerify(this.verifyId, this.email).subscribe({
            next: data => {
                this.type = 'success';
                this.message = '验证成功';
            },
            error: e => {
                this.type = 'error';
                this.message = e.msg;
            }
        });
    }

}
