import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleRoutingModule} from './article-routing.module';
import {ArticleComponent} from './article.component';
import {
    NzAffixModule,
    NzAnchorModule, NzAvatarModule,
    NzButtonModule,
    NzCommentModule,
    NzDividerModule, NzFormModule,
    NzGridModule,
    NzIconModule, NzInputModule,
    NzLayoutModule, NzListModule, NzTabsModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ArticleComponent
    ],
    imports: [
        CommonModule,
        ArticleRoutingModule,
        NzGridModule,
        NzAnchorModule,
        NzAffixModule,
        NzButtonModule,
        NzIconModule,
        NzLayoutModule,
        NzDividerModule,
        NzCommentModule,
        NzFormModule,
        FormsModule,
        NzAvatarModule,
        NzInputModule,
        NzListModule,
        NzTabsModule
    ]
})
export class ArticleModule {
}
