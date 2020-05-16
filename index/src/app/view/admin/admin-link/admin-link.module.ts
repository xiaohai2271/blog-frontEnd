import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLinkComponent} from './admin-link.component';
import {
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzFormModule, NzInputModule,
    NzModalModule,
    NzPopconfirmModule, NzSelectModule,
    NzTableModule
} from "ng-zorro-antd";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        AdminLinkComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminLinkComponent}]),
        NzCardModule,
        NzTableModule,
        NzDividerModule,
        NzPopconfirmModule,
        NzModalModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzSelectModule,
        NzButtonModule
    ]
})
export class AdminLinkModule {
}
