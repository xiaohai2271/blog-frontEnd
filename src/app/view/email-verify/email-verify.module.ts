import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {EmailVerifyComponent} from './email-verify.component';
import {NzAlertModule} from 'ng-zorro-antd';

const routes: Route[] = [
    {path: '**', component: EmailVerifyComponent}
];

@NgModule({
    declarations: [
        EmailVerifyComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NzAlertModule
    ]
})


export class EmailVerifyModule {
}
