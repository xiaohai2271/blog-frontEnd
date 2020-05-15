import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminArticleComponent} from './admin-article.component';

@NgModule({
    declarations: [
        AdminArticleComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminArticleComponent}])
    ]
})
export class AdminArticleModule {
}