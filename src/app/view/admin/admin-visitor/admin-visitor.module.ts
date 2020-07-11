import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminVisitorComponent} from './admin-visitor.component';
import {CommonTableModule} from '../components/common-table/common-table.module';


@NgModule({
    declarations: [
        AdminVisitorComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminVisitorComponent}]),
        CommonTableModule
    ]
})
export class AdminVisitorModule {
}
