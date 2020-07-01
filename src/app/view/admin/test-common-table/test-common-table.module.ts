import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestCommonTableComponent} from './test-common-table.component';
import {Router, RouterModule} from '@angular/router';
import {CommonTableModule} from '../components/common-table/common-table.module';
import {NzCheckboxModule, NzTagModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [TestCommonTableComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: TestCommonTableComponent}]),
        CommonTableModule,
        NzTagModule,
        NzCheckboxModule,
        FormsModule
    ]
})
export class TestCommonTableModule {
}
