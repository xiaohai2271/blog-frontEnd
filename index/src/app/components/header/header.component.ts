import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {windowWidthChange} from '../../utils/util';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {ApiService} from '../../api/api.service';
import {User} from '../../class/User';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router,
                private apiService: ApiService) {
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


        this.showList = window.innerWidth > this.mobileMaxWidth;
        this.changeLoginButtonV();
        // 监听宽度变化
        windowWidthChange(() => {
            this.showList = window.innerWidth > this.mobileMaxWidth;
            this.changeLoginButtonV();
        });

        this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: RouterEvent) => {
            // indexOf ==>  -1/index
            const indexOfParam = e.url.indexOf('?');
            const path = e.url.substr(0, indexOfParam === -1 ? e.url.length : indexOfParam);
            // lastIndexOf ==> 0/index
            const indexOf = path.lastIndexOf('/');
            const prefix = path.substr(0, indexOf === 0 ? path.length : indexOf);
            this.currentPath = prefix;
            if (prefix === '/user' || prefix === '/write' || prefix === '/update') {
                this.size = 'default';
            } else {
                this.size = 'large';
            }
            this.getInfo();
        });
    }

    @Output() loginEvent = new EventEmitter();
    @Output() registrationEvent = new EventEmitter();
    size: 'large' | 'default';
    currentPath: string;


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
        this.apiService.userInfo().subscribe(data => {
                this.userInfo = data.result;
                this.changeLoginButtonV();
            },
            error => {
            }
        );
    }

    logout() {
        this.apiService.logout().subscribe(data => {
                location.reload();
            },
            error => {
            }
        );
        this.userInfo = null;
    }

    toAdminPage() {
        window.location.href = '/admin';
    }
}

