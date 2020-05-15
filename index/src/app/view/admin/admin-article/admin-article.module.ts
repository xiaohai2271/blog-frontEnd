import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminArticleComponent} from './admin-article.component';
import {CommonTableModule} from '../components/common-table/common-table.module';
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
        CommonTableModule,
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
