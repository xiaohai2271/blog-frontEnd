import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonTableComponent} from './common-table.component';
import {
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzIconModule, NzModalModule, NzOutletModule, NzPopconfirmModule, NzSwitchModule,
    NzTableModule, NzTagModule,
    NzToolTipModule,
    NzTypographyModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop'

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
        NzPopconfirmModule,
        NzModalModule,
        NzTagModule,
        NzSwitchModule,
        FormsModule,
        DragDropModule,
        NzButtonModule
    ]
})
export class CommonTableModule {
}
