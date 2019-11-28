import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  constructor(private message: NzMessageService,
              public userService: UserService,
              private router: Router,
              private routerinfo: ActivatedRoute) {
  }

  private pwd: string;
  private rePwd: string;

  private email: string;
  private verifyId: string;

  iserror: boolean = false;


  ngOnInit() {
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
    }

    const reqBody = {
      email: this.email,
      verifyId: this.verifyId,
      pwd: this.pwd
    };
    this.userService.resetPWd(reqBody).subscribe(data => {
      if (data.code === 0) {
        this.message.success('重置密码成功,5秒后转跳到登录页面。');
        setTimeout(() => {
          this.router.navigateByUrl('/login');
          // window.location.href = '/login';
        }, 5000);
      } else {
        this.message.error(data.msg);
      }
    });


  }
}
