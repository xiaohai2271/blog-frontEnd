import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonTableComponent} from './common-table.component';
import {NzTableModule} from "ng-zorro-antd";


@NgModule({
    declarations: [
        CommonTableComponent
    ],
    imports: [
        CommonModule,
        NzTableModule
    ]
})
export class CommonTableModule {
}
