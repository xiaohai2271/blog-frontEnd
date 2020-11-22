import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminCommentComponent} from './admin-comment.component';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzCommentModule} from 'ng-zorro-antd/comment';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {EditableTagModule} from '../components/editable-tag/editable-tag.module';


@NgModule({
    declarations: [
        AdminCommentComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminCommentComponent}]),
        CommonTableModule,
        NzTagModule,
        EditableTagModule,
        NzModalModule,
        NzCommentModule,
        NzAvatarModule,
    ]
})
export class AdminCommentModule {
}
