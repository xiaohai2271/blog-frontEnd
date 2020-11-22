import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminTagComponent} from './admin-tag.component';
import {FormsModule} from '@angular/forms';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {EditableTagModule} from '../components/editable-tag/editable-tag.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';


@NgModule({
    declarations: [
        AdminTagComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminTagComponent}]),
        FormsModule,
        CommonTableModule,
        EditableTagModule,
        NzCardModule,
        NzTabsModule,
        NzIconModule,
        NzButtonModule,
    ]
})
export class AdminTagModule {
}
