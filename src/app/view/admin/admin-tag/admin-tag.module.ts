import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminTagComponent} from './admin-tag.component';
import {FormsModule} from '@angular/forms';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {EditableTagModule} from '../components/editable-tag/editable-tag.module';
import {NzButtonModule, NzCardModule, NzIconModule, NzTabsModule} from 'ng-zorro-antd';


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
