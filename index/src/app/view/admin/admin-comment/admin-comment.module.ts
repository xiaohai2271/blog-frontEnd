import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminCommentComponent} from './admin-comment.component';


@NgModule({
    declarations: [
        AdminCommentComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminCommentComponent}])
    ]
})
export class AdminCommentModule {
}
