import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminUpdateComponent} from './admin-update.component';


@NgModule({
    declarations: [
        AdminUpdateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminUpdateComponent}])
    ]
})
export class AdminUpdateModule {
}
