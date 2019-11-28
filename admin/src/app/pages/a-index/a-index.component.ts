import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {VisitorService} from '../../services/visitor/visitor.service';
import {WebUpdateService} from '../../services/update/web-update.service';
import {LogService} from '../../services/log/log.service';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-a-index',
    templateUrl: './a-index.component.html',
    styleUrls: ['./a-index.component.css']
})
export class AIndexComponent implements OnInit {

    constructor(public userService: UserService,
                public visitorService: VisitorService,
                public webUpdateService: WebUpdateService,
                public logService: LogService) {
    }

    Loading: boolean = false;
    ip: string;
    location: string;

    ngOnInit() {
        if (this.userService.userInfo) {
            if (this.userService.userInfo.role === 'admin') {
                this.admin();
            } else {
                this.user();
            }
        } else {
            this.userService.getUserInfo().subscribe(data => {
                if (data.result.role === 'admin') {
                    this.admin();
                } else {
                    this.user();
                }
            });
        }
    }

    admin() {
        if (!this.visitorService.dayVisit) {
            this.visitorService.getDayVisitor();
        }
        this.visitorService.getTotalVisitorCount();
        if (!this.webUpdateService.lastestUpdateTime) {
            this.webUpdateService.getLastestUpdateTime();
        }
        this.readLog();
    }

    user() {
        this.visitorService.getLocalIp().subscribe(data => {
            if (data.code === 0) {
                this.ip = data.result;
                const getip = this.visitorService.getIp(this.ip);
                if (getip instanceof Observable) {
                    getip.subscribe(ipOb => {
                        this.location = ipOb.result;
                    });
                } else {
                    this.location = getip;
                }
            }
        });
    }

    readLog() {
        this.Loading = true;
        this.logService.getLog().subscribe(date => {
            setTimeout(() => {
                this.Loading = false;
            }, 100);
        });
    }

}
