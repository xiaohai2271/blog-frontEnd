import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    isCollapsed: boolean = false;

    constructor(public userService: UserService) {

    }

    ngOnInit(): void {
    }


}
