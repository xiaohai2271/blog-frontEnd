import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLinkComponent} from './admin-link.component';


@NgModule({
    declarations: [
        AdminLinkComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminLinkComponent}])
    ]
})
export class AdminLinkModule {
}
