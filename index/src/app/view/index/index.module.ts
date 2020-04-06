import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {IndexRoutingModule} from './index-routing.module';
import {ArticleDetailCardComponent} from './components/article-detail-card/article-detail-card.component';
import {
    NzBackTopModule,
    NzCardModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzPaginationModule,
    NzToolTipModule
} from 'ng-zorro-antd';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { TagTagComponent } from './components/tag-tag/tag-tag.component';


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
