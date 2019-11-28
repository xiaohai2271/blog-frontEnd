import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {environment} from '../../../environments/environment';

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

    ngOnInit() {
    }

    logout() {
        this.userService.logout();
        window.location.href = '/';
    }

    toPage(path: string) {
        window.location.href = path;
    }
}
