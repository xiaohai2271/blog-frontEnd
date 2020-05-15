import {Component, OnInit} from '@angular/core';
import {GlobalUserService} from '../../services/global-user.service';
import {User} from '../../class/User';
import {ApiService} from '../../api/api.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

    constructor(public gUserService: GlobalUserService, private apiService: ApiService) {
    }

    user: User;
    isCollapsed: boolean = false;
    infoDrawerVisible: boolean = false;
    sayHelloContent: string;

    ngOnInit(): void {
        this.gUserService.watchUserInfo({
                complete: () => null,
                error: (err) => null,
                next: data => {
                    console.log('更新user')
                    this.user = data.result
                }
            }
        )
        const hours = new Date().getHours();
        if (hours < 6) {
            this.sayHelloContent = `夜深了，注意早点休息哦！${this.user.displayName}`
        } else if (hours < 10) {
            this.sayHelloContent = `早上好呀！${this.user.displayName}`
        } else if (hours < 14) {
            this.sayHelloContent = `中午好呀！${this.user.displayName}`
        } else if (hours < 19) {
            this.sayHelloContent = `下午好呀！${this.user.displayName}`
        } else if (hours < 22) {
            this.sayHelloContent = `晚上好呀！${this.user.displayName}`
        } else {
            this.sayHelloContent = `时间不早了，注意休息哦！${this.user.displayName}`
        }
    }

    showInfoDrawer() {
        this.infoDrawerVisible = !this.infoDrawerVisible;
    }
}
