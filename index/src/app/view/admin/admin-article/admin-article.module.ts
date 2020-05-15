import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminArticleComponent} from './admin-article.component';
import {
    NzCardModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzTableModule,
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
    ]
})
export class AdminArticleModule {
}
