import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../class/User';

@Component({
    selector: 'c-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.less']
})
export class AdminHeaderComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    user: User

    logout = () => this.userService.logout();

    ngOnInit(): void {
        this.userService.watchUserInfo({
            next: data => this.user = data.result,
            error: err => this.user = null,
            complete: null
        })
    }

}
