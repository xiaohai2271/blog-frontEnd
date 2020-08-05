import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {windowWidthChange} from '../../utils/util';
import {ApiService} from '../../api/api.service';
import {User} from '../../class/User';
import {ComponentStateService} from '../../services/component-state.service';
import {GlobalUserService} from '../../services/global-user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router,
                public componentStateService: ComponentStateService,
                private userService: GlobalUserService) {
        this.pageList = [
            {name: '首页', path: '/', icon: 'home', iconType: 'fill', show: true},
            {name: '分类', path: '/categories', icon: 'project', iconType: 'fill', show: true},
            {name: '标签', path: '/tags', icon: 'tags', iconType: 'fill', show: true},
            // {name: '留言', path: '/leaveMsg', icon: 'carry-out', iconType: 'fill', show: true},
            {name: '更新', path: '/update', icon: 'up-square', iconType: 'fill', show: true},
            {name: '友链', path: '/links', icon: 'link', iconType: 'outline', show: true},
            {name: '登录', path: '/login', icon: 'login', iconType: 'outline', show: false},
            {name: '注册', path: '/registration', icon: 'user', iconType: 'outline', show: false}
        ];

        this.getInfo();
        this.showList = window.innerWidth > this.mobileMaxWidth;
        this.changeLoginButtonV();
        // 监听宽度变化
        windowWidthChange(() => {
            this.showList = window.innerWidth > this.mobileMaxWidth;
            this.changeLoginButtonV();
        });
        // 订阅一级路由的变化
        componentStateService.watchRouterChange().subscribe(prefix => {
            // TODO:: 使用service来获取 size
            if (prefix === '/user' || prefix === '/write' || prefix === '/update' || prefix === '/maintain') {
                this.size = 'default';
            } else {
                this.size = 'large';
            }
        });
    }

    @Output() loginEvent = new EventEmitter();
    @Output() registrationEvent = new EventEmitter();
    size: 'large' | 'default';
    currentPath: string;
    noAvatarUrl = 'https://cdn.celess.cn/'

    public pageList: {
        path: string;
        name: string;
        icon: string;
        iconType: 'outline' | 'fill' | 'twotone';
        show: boolean;
    }[];


    public showList = true;
    // css 样式中设置移动端最大宽度为910px 见src/app/global-variables.less
    private readonly mobileMaxWidth = 940;

    @Input() userInfo: User;

    ngOnInit() {
    }

    changeMenuStatus() {
        this.showList = !this.showList;
        this.changeLoginButtonV();
    }

    private changeLoginButtonV() {
        this.pageList.forEach(e => {
            if (e.name === '登录' || e.name === '注册') {
                if (this.userInfo) {
                    e.show = false;
                } else {
                    e.show = (this.showList && window.innerWidth < this.mobileMaxWidth);
                }
            }
        });
    }

    dealLink(path: string) {
        this.showList = window.innerWidth > this.mobileMaxWidth;
        if (path === '/login') {
            this.login();
        } else if (path === '/registration') {
            this.registration();
        } else {
            this.router.navigateByUrl(path);
        }
    }

    login() {
        this.showList = window.innerWidth > this.mobileMaxWidth;
        if (this.currentPath === '/article' || this.currentPath === '/write') {
            this.loginEvent.emit();
            return;
        }
        this.router.navigateByUrl('/user/login');
    }

    registration() {
        this.showList = window.innerWidth > this.mobileMaxWidth;
        if (this.currentPath === '/article' || this.currentPath === '/write') {
            this.registrationEvent.emit();
            return;
        }
        this.router.navigateByUrl('/user/registration');
    }

    getInfo() {
        this.userService.watchUserInfo({
                complete: () => null,
                error: (err) => null,
                next: data => {
                    this.userInfo = data.result;
                    this.changeLoginButtonV();
                }
            }
        );
    }

    logout() {
        this.userService.logout({
            next: data => null,
            error: err => null,
            complete: () => null
        });
    }

    toAdminPage() {
        this.router.navigateByUrl('/admin')
    }
}

