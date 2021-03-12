import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {COLOR_LIST} from '../../../../utils/color';
import {Router} from '@angular/router';

@Component({
    selector: 'c-tag-tag',
    templateUrl: './tag-tag.component.html',
    styleUrls: ['./tag-tag.component.less']
})
export class TagTagComponent implements OnInit {

    @Input() tag: { name: string; size: number };
    @Input() size: 'default' | 'large' = 'default';
    @Input() clickable: boolean; // default true
    @Input() enableCount: boolean; // default true
    @Output() tagClick = new EventEmitter();
    randColor: { bgColor: string; fontColor: string };

    constructor(private router: Router) {
    }

    ngOnInit() {
        const randomNumber = Math.floor(COLOR_LIST.length * Math.random());
        this.randColor = COLOR_LIST[randomNumber];
        if (this.clickable == null) {
            this.clickable = true;
        }
        if (this.enableCount == null) {
            this.enableCount = true;
        }
    }

    click() {
        this.tagClick.emit();
    }
}
