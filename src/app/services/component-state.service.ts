import {Injectable} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Observable, of, Subscriber} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ComponentStateService {

    constructor(private router: Router) {
        this.watchRouterChange();
    }

    visible = {
        header: true,
        footer: true,
        globalBackToTop: true
    };

    currentPath: string;
    getCurrentRouterPath = () => this.currentPath;

    watchRouterChange() {
        let subscriber: Subscriber<string>;
        const ob = new Observable(o => subscriber = o);
        this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: RouterEvent) => {
            // indexOf ==>  -1/index
            const indexOfParam = e.url.indexOf('?');
            const path = e.url.substr(0, indexOfParam === -1 ? e.url.length : indexOfParam);
            // lastIndexOf ==> 0/index
            const indexOf = path.lastIndexOf('/');
            const prefix = path.substr(0, indexOf === 0 ? path.length : indexOf);
            this.dealWithPathChange(prefix);
            this.currentPath = prefix;
            if (subscriber) {subscriber.next(prefix);}
        });
        return ob;
    }

    private dealWithPathChange(path) {
        // eslint-disable-next-line guard-for-in
        for (const visibleKey in this.visible) {
            this.visible[visibleKey] = true;
        }
        switch (path) {
            case '/admin':
                this.visible.header = false;
                this.visible.footer = false;
                this.visible.globalBackToTop = false;
                break;
            case '/user':
            case '/write':
                this.visible.footer = false;
                this.visible.globalBackToTop = false;
                break;

            default:
        }
    }
}
