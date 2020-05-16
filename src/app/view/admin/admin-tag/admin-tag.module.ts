import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminTagComponent} from './admin-tag.component';
import {
    NzButtonModule,
    NzCardModule,
    NzDividerModule, NzIconModule,
    NzInputModule, NzPopconfirmModule,
    NzTableModule, NzTabsModule, NzTagModule,
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AdminTagComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminTagComponent}]),
        NzCardModule,
        NzTableModule,
        NzDividerModule,
        NzInputModule,
        FormsModule,
        NzTabsModule,
        NzPopconfirmModule,
        NzButtonModule,
        NzIconModule,
        NzTagModule,
    ]
})
export class AdminTagModule {
}
