import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found.component';
import {Route, RouterModule} from '@angular/router';

const routes: Route[] = [
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class PageNotFoundModule {
}
