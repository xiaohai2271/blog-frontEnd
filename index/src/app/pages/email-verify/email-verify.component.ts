import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user/user.service';


@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {

  constructor(private titleService: Title,
              public userService: UserService,
              private router: Router,
              public routerinfo: ActivatedRoute) {
    titleService.setTitle('小海博客|邮箱验证');
  }

  type: string = 'info';
  message: string = '正在验证，请稍等';
  desc: string = '';


  private email: string;
  private verifyId: string;


  ngOnInit() {
    this.email = this.routerinfo.snapshot.queryParams.email;
    this.verifyId = this.routerinfo.snapshot.queryParams.verifyId;
    if (this.email == null || this.verifyId == null) {
      this.type = 'warning';
      this.message = '数据不全';
      this.desc = '链接可能被修改了，请重新点击邮箱中的链接，或者重新发送邮件';
    }
    const reqBody = {
      email: this.email,
      verifyId: this.verifyId
    };
    this.userService.emailVerify(reqBody).subscribe(data => {
      if (data.code === 0) {
        this.type = 'success';
        this.message = '验证成功';
        // this.desc = "5秒后转跳到后台"
        // setTimeout(() => {
        // window.location.href = "admin"
        // }, 5000);
      } else {
        this.type = 'error';
        this.message = data.msg;
      }
    });
  }


}
