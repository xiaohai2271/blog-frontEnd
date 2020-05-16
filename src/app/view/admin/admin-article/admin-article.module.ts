import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminArticleComponent} from './admin-article.component';
import {
    NzCardModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzTableModule, NzTagModule,
    NzToolTipModule,
    NzTypographyModule
} from 'ng-zorro-antd';

@NgModule({
    declarations: [
        AdminArticleComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminArticleComponent}]),
        NzTableModule,
        NzTypographyModule,
        NzToolTipModule,
        NzCardModule,
        NzDividerModule,
        NzPopconfirmModule,
        NzTagModule,
    ]
})
export class AdminArticleModule {
}
