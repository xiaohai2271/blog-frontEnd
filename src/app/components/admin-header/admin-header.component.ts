import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GlobalUserService} from '../../services/global-user.service';
import {User} from '../../class/User';

@Component({
    selector: 'c-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.less']
})
export class AdminHeaderComponent implements OnInit {
    @Output() infoClicked = new EventEmitter<void>();
    user: User;
    noAvatarUrl = 'https://cdn.celess.cn/';

    constructor(private userService: GlobalUserService) {
    }


    logout = () => this.userService.logout();
    infoClickedEvent = () => this.infoClicked.emit();

    ngOnInit(): void {
        this.userService.watchUserInfo({
            next: data => this.user = data.result,
            error: err => this.user = null,
            complete: null
        });
    }

}
