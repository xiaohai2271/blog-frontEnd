import {Component, OnInit} from '@angular/core';
import {VisitorService} from '../../services/visitor/visitor.service';

@Component({
    selector: 'app-visitor-manager',
    templateUrl: './visitor-manager.component.html',
    styleUrls: ['./visitor-manager.component.css']
})
export class VisitorManagerComponent implements OnInit {

    constructor(public visitorService: VisitorService) {

    }


    pageNum: number = 1;
    pageSize: number = 10;


    localIp = '';

    location: string;


    ngOnInit() {
        this.getPageData();
        this.visitorService.getDayVisitor();
        this.visitorService.getLocalIp().subscribe(data => {
            this.localIp = data.result;
        });
    }


    getIp(ip) {
        const result = this.visitorService.getIp(ip);
        if (typeof result === 'string') {
            this.location = result;
            return;
        }
        result.subscribe(data => {
            if (data.code === 0) {
                this.location = data.result;
            }
        });
    }

    getPageData() {
        this.visitorService.getVisitor(this.pageNum, this.pageSize);
    }


    toPage(e) {
        this.pageNum = e;
        this.getPageData();
    }


}
