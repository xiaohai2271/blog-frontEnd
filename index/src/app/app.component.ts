import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LoginReq} from './class/LoginReq';
import {HeaderComponent} from './components/header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    loginModal: boolean = false;
    regModal: boolean = false;
    @ViewChild('headerComponent') header: HeaderComponent;

    registration() {
        // todo :: 登录
        console.log('registration');
        this.regModal = true;

    }

    login() {
        // TODO :: 注册
        console.log('login');
        this.loginModal = true;
    }

    cons($event: LoginReq) {
        console.log($event);
    }

    loginStatus(e: boolean) {
        if (e) {
            this.header.getInfo();
        }
        this.loginModal = !e;
    }
}
