import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../class/User';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

    constructor(public userService: UserService) {
    }

    user: User;
    isCollapsed: boolean = false;

    ngOnInit(): void {
        this.userService.watchUserInfo({
                complete: () => null,
                error: (err) => null,
                next: data => {
                    console.log('更新user')
                    this.user = data.result
                }
            }
        )
    }

}
