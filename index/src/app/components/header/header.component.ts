import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public userService: UserService) {
  }

  // 菜单是否可见
  public visible: boolean = false;
  // 导航是否可见（手机显示时）
  public visibleOfMenu: boolean = false;

  ngOnInit() {
    this.userService.getUserInfo();
    this.userService.http.visit();
  }

  logout() {
    this.userService.logout();
  }
}
