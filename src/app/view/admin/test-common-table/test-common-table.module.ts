import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestCommonTableComponent} from './test-common-table.component';
import {Router, RouterModule} from '@angular/router';
import {CommonTableModule} from '../components/common-table/common-table.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {FormsModule} from '@angular/forms';
import {EditableTagModule} from '../components/editable-tag/editable-tag.module';


@NgModule({
    declarations: [TestCommonTableComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: TestCommonTableComponent}]),
        CommonTableModule,
        NzTagModule,
        NzCheckboxModule,
        FormsModule,
        EditableTagModule
    ]
})
export class TestCommonTableModule {
}
