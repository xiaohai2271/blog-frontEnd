import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminUserComponent} from './admin-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTagModule} from 'ng-zorro-antd/tag';


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
