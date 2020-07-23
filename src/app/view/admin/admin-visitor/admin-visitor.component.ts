import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../../api/api.service';
import {RequestObj} from '../../../class/HttpReqAndResp';
import {Visitor} from '../../../class/Visitor';
import {Data} from '../components/common-table/data';

@Component({
    selector: 'app-admin-visitor',
    templateUrl: './admin-visitor.component.html'
})
export class AdminVisitorComponent implements OnInit {

    constructor(private apiService: ApiService, private title: Title) {
    }

    headData: Data<Visitor>[];
    request: RequestObj

    /***
     * browserName: "Chrome 8"
     browserVersion: "83.0.4103.116"
     date: "2020-07-11 09:30:13"
     id: 3131
     ip: "127.0.0.1"
     osname: "Windows 10"
     */
    ngOnInit(): void {
        this.title.setTitle('小海博客 | 访客信息管理')
        this.request = {
            path: '/admin/visitor/page',
            method: 'GET',
            queryParam: {
                count: 1,
                page: 10,
                showLocation: location
            }
        }
        this.headData = [
            {fieldValue: 'id', title: '主键', show: false, primaryKey: true},
            {fieldValue: 'date', title: '访问日期', show: true},
            {fieldValue: 'browserName', title: '浏览器', show: true},
            {fieldValue: 'ip', title: 'ip地址', show: true},
            {fieldValue: 'browserVersion', title: '浏览器版本', show: true},
            {fieldValue: 'osname', title: '系统', show: true}
        ]
    }
}
