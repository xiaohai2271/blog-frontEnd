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
        this.getLog();
        this.getCounts();
        this.getDayVisitCount();
        this.getUserInfo();
    }

    logLoading: true;
    logText: string;
    counts: {
        articleCount: number,
        visitorCount: number,
        categoryCount: number,
        leaveMsgCount: number,
        tagCount: number,
        commentCount: number
    }
    dayVisitCount: number
    userInfo: User;

    ngOnInit(): void {
    }

    getLog() {
        this.http.get('https://api.celess.cn/blog.log', {responseType: 'text'}).subscribe(data => {
            this.logText = data;
        });
    }

    getCounts = () => this.apiService.counts().subscribe({
        next: data => this.counts = data.result
    })

    getDayVisitCount = () => this.apiService.dayVisitCount().subscribe({
        next: data => this.dayVisitCount = data.result
    })

    getUserInfo = () => this.userService.watchUserInfo({
        next: data => this.userInfo = data.result,
        error: null,
        complete: null
    })
}
