import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestCommonTableComponent} from './test-common-table.component';
import {Router, RouterModule} from '@angular/router';
import {CommonTableModule} from "../components/common-table/common-table.module";


@NgModule({
    declarations: [TestCommonTableComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: TestCommonTableComponent}]),
        CommonTableModule
    ]
})
export class TestCommonTableModule {
}
