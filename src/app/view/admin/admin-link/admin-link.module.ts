import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLinkComponent} from './admin-link.component';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {NzCheckboxModule, NzFormModule, NzInputModule, NzModalModule, NzSelectModule, NzTagModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AdminLinkComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminLinkComponent}]),
        CommonTableModule,
        NzCheckboxModule,
        NzModalModule,
        FormsModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzSelectModule,
        NzTagModule,

    ]
})
export class AdminLinkModule {
}
