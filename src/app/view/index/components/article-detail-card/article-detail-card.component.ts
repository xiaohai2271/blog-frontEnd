import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../../class/Article';

@Component({
    selector: 'c-article-detail-card',
    templateUrl: './article-detail-card.component.html',
    styleUrls: ['./article-detail-card.component.less']
})
export class ArticleDetailCardComponent implements OnInit {

    @Input() data: Article;
    @Input() showMediaArea: boolean;
    @Input() showTagArea: boolean;

    constructor() {
    }

    ngOnInit() {
        if (this.data == null || this.data.id == null) {
            throw Error('data 不可为空');
        }
        if (this.showMediaArea == null) {
            // 如果作者名不为空 则显示
            this.showMediaArea = this.data.author.displayName != null;
        }
        if (this.showTagArea == null) {
            this.showTagArea = this.data.tags != null;
        }

    }

}
