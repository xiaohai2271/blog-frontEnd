import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminVisitorComponent} from './admin-visitor.component';


@NgModule({
    declarations: [
        AdminVisitorComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminVisitorComponent}])
    ]
})
export class AdminVisitorModule {
}
