import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {IndexRoutingModule} from './index-routing.module';
import {ArticleDetailCardComponent} from './components/article-detail-card/article-detail-card.component';
import {NzBackTopModule} from 'ng-zorro-antd/back-top';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {CardDetailComponent} from './components/card-detail/card-detail.component';
import {TagTagComponent} from './components/tag-tag/tag-tag.component';


@NgModule({
    declarations: [
        IndexComponent,
        ArticleDetailCardComponent,
        CardDetailComponent,
        TagTagComponent
    ],
    imports: [
        CommonModule,
        IndexRoutingModule,
        NzCardModule,
        NzIconModule,
        NzDividerModule,
        NzGridModule,
        NzToolTipModule,
        NzPaginationModule,
        NzBackTopModule,
    ],
    exports: [
        TagTagComponent,
        ArticleDetailCardComponent
    ]
})
export class IndexModule {

}
