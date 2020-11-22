import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLinkComponent} from './admin-link.component';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTagModule} from 'ng-zorro-antd/tag';
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
        NzButtonModule,

    ]
})
export class AdminLinkModule {
}
