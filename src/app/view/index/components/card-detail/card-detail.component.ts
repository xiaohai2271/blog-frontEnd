import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'c-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.less']
})
export class CardDetailComponent implements OnInit {

    @Input() title: string;

    constructor() {
    }

    // @ContentChildren() c:T;

    ngOnInit() {
        console.log();
    }

}
