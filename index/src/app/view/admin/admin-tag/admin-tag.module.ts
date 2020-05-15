import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminTagComponent} from './admin-tag.component';


@NgModule({
    declarations: [
        AdminTagComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminTagComponent}])
    ]
})
export class AdminTagModule {
}
