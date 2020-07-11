import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminArticleComponent} from './admin-article.component';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {FormsModule} from '@angular/forms';
import {NzCheckboxModule, NzTagModule} from 'ng-zorro-antd';

@NgModule({
    declarations: [
        AdminArticleComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminArticleComponent}]),
        CommonTableModule,
        FormsModule,
        NzTagModule,
        NzCheckboxModule,
    ]
})
export class AdminArticleModule {
}
