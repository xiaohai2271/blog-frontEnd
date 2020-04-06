import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Route, Router, RouterEvent} from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
    show: boolean;

    constructor(private router: Router) {
        this.show = true;
    }

    readonly gName: string;

    ngOnInit() {
        this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: RouterEvent) => {
            const indexOf = e.url.lastIndexOf('/');
            const prefix = e.url.substr(0, indexOf === 0 ? e.url.length : indexOf);
            if (prefix === '/user' || prefix === '/write') {
                this.show = false;
            }
        });
    }

}
