import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminCommentComponent} from './admin-comment.component';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {NzTagModule} from 'ng-zorro-antd';


@NgModule({
    declarations: [
        AdminCommentComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminCommentComponent}]),
        CommonTableModule,
        NzTagModule,
    ]
})
export class AdminCommentModule {
}
