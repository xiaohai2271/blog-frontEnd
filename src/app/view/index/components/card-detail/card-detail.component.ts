import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'c-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.less']
})
export class CardDetailComponent implements OnInit {

    constructor() {
    }

    @Input() title: string;

    // @ContentChildren() c:T;

    ngOnInit() {
        console.log();
    }

}
