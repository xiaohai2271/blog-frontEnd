import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminCategoryComponent} from './admin-category.component';

@NgModule({
    declarations: [
        AdminCategoryComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminCategoryComponent}])
    ]
})
export class AdminCategoryModule {
}
