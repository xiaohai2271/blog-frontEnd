import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdateComponent} from './update.component';
import {Route, RouterModule} from '@angular/router';
import {NzTagModule} from 'ng-zorro-antd';

const routes: Route[] = [{path: '**', component: UpdateComponent}];

@NgModule({
    declarations: [UpdateComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NzTagModule
    ]
})
export class UpdateModule {
}
