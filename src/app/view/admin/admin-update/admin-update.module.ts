import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminUpdateComponent} from './admin-update.component';
import {
    NzButtonModule,
    NzCardModule,
    NzDividerModule, NzIconModule, NzInputModule, NzModalModule,
    NzPopconfirmModule,
    NzTableModule,
    NzToolTipModule,
    NzTypographyModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AdminUpdateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminUpdateComponent}]),
        NzCardModule,
        NzTableModule,
        NzTypographyModule,
        NzToolTipModule,
        NzDividerModule,
        NzPopconfirmModule,
        NzModalModule,
        FormsModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule
    ]
})
export class AdminUpdateModule {
}
