import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminIndexComponent} from './admin-index.component';


@NgModule({
    declarations: [
        AdminIndexComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminIndexComponent}])
    ]
})
export class AdminIndexModule {
}
