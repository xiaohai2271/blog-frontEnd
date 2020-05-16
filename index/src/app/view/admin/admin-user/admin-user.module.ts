import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminUserComponent} from './admin-user.component';
import {
    NzButtonModule,
    NzCardModule,
    NzDividerModule, NzFormModule, NzIconModule, NzInputModule,
    NzModalModule,
    NzPopconfirmModule, NzRadioModule, NzSelectModule,
    NzTableModule,
    NzTagModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AdminUserComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminUserComponent}]),
        NzCardModule,
        NzTableModule,
        NzPopconfirmModule,
        NzDividerModule,
        NzTagModule,
        NzModalModule,
        NzButtonModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzSelectModule,
        NzRadioModule,
        NzIconModule

    ]
})
export class AdminUserModule {
}
