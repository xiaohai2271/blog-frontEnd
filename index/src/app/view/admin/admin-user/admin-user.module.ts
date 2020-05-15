import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminUserComponent} from './admin-user.component';


@NgModule({
    declarations: [
        AdminUserComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminUserComponent}])

    ]
})
export class AdminUserModule {
}
