import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonTableComponent} from './common-table.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzOutletModule} from 'ng-zorro-antd/core/outlet';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {FormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

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
