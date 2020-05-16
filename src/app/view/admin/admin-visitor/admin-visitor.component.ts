import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../api/api.service';
import {PageList} from '../../../class/HttpReqAndResp';
import {Visitor} from '../../../class/Visitor';

@Component({
    selector: 'app-admin-visitor',
    templateUrl: './admin-visitor.component.html',
    styleUrls: ['./admin-visitor.component.less']
})
export class AdminVisitorComponent implements OnInit {

    constructor(private apiService: ApiService, private title: Title) {
    }

    pageIndex: number = 1;
    pageSize: number = 10;

    pageList: PageList<Visitor> = new PageList<Visitor>();

    loading: boolean = true;

    ngOnInit(): void {
        this.title.setTitle('小海博客 | 访客信息管理')
        this.getVisitors();
    }

    getVisitors = () => this.apiService.adminVisitors(false, this.pageSize, this.pageIndex).subscribe({
        next: data => this.pageList = data.result,
        complete: () => this.loading = false,
        error: err => this.loading = false
    })
}
