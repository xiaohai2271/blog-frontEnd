import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminUpdateComponent} from './admin-update.component';

import {FormsModule} from '@angular/forms';
import {CommonTableModule} from '../components/common-table/common-table.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';


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
