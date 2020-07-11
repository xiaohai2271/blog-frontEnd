import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminUpdateComponent} from './admin-update.component';

import {FormsModule} from '@angular/forms';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {NzButtonModule, NzInputModule, NzModalModule} from 'ng-zorro-antd';


@NgModule({
    declarations: [
        AdminUpdateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminUpdateComponent}]),
        FormsModule,
        CommonTableModule,
        NzModalModule,
        NzInputModule,
        NzButtonModule
    ]
})
export class AdminUpdateModule {
}
