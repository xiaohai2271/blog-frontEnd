import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminUserinfoComponent} from './admin-userinfo.component';


@NgModule({
    declarations: [
        AdminUserinfoComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminUserinfoComponent}])
    ]
})
export class AdminUserinfoModule {
}
