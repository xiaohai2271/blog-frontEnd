import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../api/api.service';
import {GlobalUserService} from '../../../services/global-user.service';
import {User} from '../../../class/User';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.less']
})
export class AdminDashboardComponent implements OnInit {
    constructor(private apiService: ApiService, private userService: GlobalUserService, private http: HttpClient) {
        this.getUserInfo();
    }

    logLoading: boolean = true;
    logText: string = null;
    counts: {
        articleCount: number,
        visitorCount: number,
        categoryCount: number,
        leaveMsgCount: number,
        tagCount: number,
        commentCount: number
    } = {articleCount: 0, visitorCount: 0, categoryCount: 0, tagCount: 0, commentCount: 0, leaveMsgCount: 0}

    dayVisitCount: number = 0;
    userInfo: User = new User();

    ngOnInit(): void {
    }

    getLog() {
        this.http.get('https://api.celess.cn/blog.log', {responseType: 'text'}).subscribe(data => {
            this.logText = data;
            this.logLoading = false
        });
    }

    getCounts = () => this.apiService.counts().subscribe({
        next: data => this.counts = data.result
    })

    getDayVisitCount = () => this.apiService.dayVisitCount().subscribe({
        next: data => this.dayVisitCount = data.result
    })

    getUserInfo = () => this.userService.watchUserInfo({
        next: data => {
            this.userInfo = data.result
            if (data.result && data.result.role === 'admin') {
                this.getLog();
                this.getCounts();
                this.getDayVisitCount();
            }
        },
        error: null,
        complete: null
    })
}
