import {Component, Input, OnInit} from '@angular/core';
import {Data} from './data';

@Component({
    selector: 'app-common-table',
    templateUrl: './common-table.component.html',
    styleUrls: ['./common-table.component.less']
})
export class CommonTableComponent<T> implements OnInit {

    constructor() {
    }

    @Input() data: Data<T>[]

    ngOnInit(): void {
    }

}
