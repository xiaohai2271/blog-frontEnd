import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminVisitorComponent} from './admin-visitor.component';
import {NzButtonModule, NzCardModule, NzDividerModule, NzTableModule} from 'ng-zorro-antd';


@NgModule({
    declarations: [
        AdminVisitorComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminVisitorComponent}]),
        NzCardModule,
        NzTableModule,
        NzButtonModule,
        NzDividerModule
    ]
})
export class AdminVisitorModule {
}
