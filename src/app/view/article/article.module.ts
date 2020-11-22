import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleRoutingModule} from './article-routing.module';
import {ArticleComponent} from './article.component';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
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
