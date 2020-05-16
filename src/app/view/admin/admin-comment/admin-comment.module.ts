import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminCommentComponent} from './admin-comment.component';
import {
    NzButtonModule,
    NzCardModule,
    NzDividerModule, NzIconModule, NzInputModule,
    NzPopconfirmModule,
    NzTableModule,
    NzToolTipModule,
    NzTypographyModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AdminCommentComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminCommentComponent}]),
        NzCardModule,
        NzTableModule,
        NzDividerModule,
        NzPopconfirmModule,
        NzTypographyModule,
        NzToolTipModule,
        NzInputModule,
        FormsModule,
        NzIconModule,
        NzButtonModule
    ]
})
export class AdminCommentModule {
}
