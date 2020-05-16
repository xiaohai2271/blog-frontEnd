import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'view-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.less']
})
export class PageNotFoundComponent implements OnInit {

    constructor(private title: Title) {
    }

    ngOnInit(): void {
        this.title.setTitle('小海博客 | 404 page not found');
    }

}
