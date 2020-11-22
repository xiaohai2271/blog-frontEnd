import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {ResetPwdComponent} from './reset-pwd.component';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {FormsModule} from '@angular/forms';

const routes: Route[] = [
    {path: '**', component: ResetPwdComponent}
];


@NgModule({
    declarations: [
        ResetPwdComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NzAlertModule,
        FormsModule
    ]
})
export class ResetPwdModule {
}
