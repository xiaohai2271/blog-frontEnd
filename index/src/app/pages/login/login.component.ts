import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {LoginReq} from '../../class/loginReq';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService,
              private routerinfo: ActivatedRoute,
              private router: Router,
              private message: NzMessageService) {
  }

  public submitBody: LoginReq = new LoginReq();


  showForgetPwd: boolean = false;

  email4Forgot: string;

  ngOnInit() {
    window.scrollTo(0, 0);
    if (this.userService.tempUser) {
      this.submitBody.email = this.userService.tempUser.email;
      this.submitBody.password = this.userService.tempUser.password;
    }
  }


  // 登录
  doLogin() {
    if (this.submitBody.email == null || this.submitBody.email === '') {
      this.message.warning('邮箱不能为空');
      return;
    }
    if (this.submitBody.password == null || this.submitBody.password === '') {
      this.message.warning('密码不能为空');
      return;
    }

    const regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!regExp.test(this.submitBody.email)) {
      this.message.error('邮箱格式不合法');
      return;
    }

    this.userService.login(this.submitBody).subscribe(data => {
      if (data.code === 0) {
        // 登录成功
        // 置空
        this.userService.tempUser = null;
        this.message.success('登录成功，欢迎你' + data.result.displayName);
      } else {
        // 登录失败
        this.message.error('登录失败，原因：' + data.msg);
      }
    });
  }


  handleCancel() {
    this.showForgetPwd = false;
  }

  /**
   * 发生重置密码的邮件
   */
  handleOk() {
    if (this.email4Forgot == null) {
      return;
    }
    const regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!regExp.test(this.email4Forgot)) {
      this.message.error('邮箱格式不合法');
      return;
    }
    this.showForgetPwd = false;
    this.userService.sendResetPwdEmail(this.email4Forgot).subscribe(data => {
      if (data.code === 0) {
        this.message.success('发送成功，请前往邮箱进行操作');
      } else {
        this.message.error(data.msg);
      }
    });
  }

}
