import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminUserComponent} from './admin-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {
    NzButtonModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule, NzModalModule,
    NzRadioModule,
    NzSelectModule, NzTagModule
} from 'ng-zorro-antd';


@NgModule({
    declarations: [
        AdminUserComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminUserComponent}]),
        ReactiveFormsModule,
        CommonTableModule,
        NzGridModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        NzRadioModule,
        NzSelectModule,
        NzFormModule,
        NzModalModule,
        NzTagModule

    ]
})
export class AdminUserModule {
}
