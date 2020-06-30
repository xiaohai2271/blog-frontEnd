import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonTableComponent} from './common-table.component';
import {NzDividerModule, NzTableModule} from 'ng-zorro-antd';


@NgModule({
    declarations: [
        CommonTableComponent
    ],
    exports: [
        CommonTableComponent
    ],
    imports: [
        CommonModule,
        NzTableModule,
        NzDividerModule
    ]
})
export class CommonTableModule {
}
