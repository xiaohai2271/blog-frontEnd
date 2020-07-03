import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonTableComponent} from './common-table.component';
import {
    NzCardModule,
    NzDividerModule,
    NzIconModule, NzOutletModule, NzPopconfirmModule,
    NzTableModule,
    NzToolTipModule,
    NzTypographyModule
} from 'ng-zorro-antd';


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
        NzDividerModule,
        NzTypographyModule,
        NzToolTipModule,
        NzCardModule,
        NzIconModule,
        NzOutletModule,
        NzPopconfirmModule
    ]
})
export class CommonTableModule {
}