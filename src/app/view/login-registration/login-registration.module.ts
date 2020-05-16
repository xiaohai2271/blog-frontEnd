import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginRegistrationRoutingModule} from './login-registration-routing.module';
import {LoginRegistrationComponent} from './login-registration.component';
import {FormsModule} from '@angular/forms';
import {NzButtonModule, NzFormModule, NzGridModule, NzInputModule, NzModalModule} from 'ng-zorro-antd';


@NgModule({
    declarations: [LoginComponent, RegistrationComponent, LoginRegistrationComponent],
    exports: [
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        LoginRegistrationRoutingModule,
        FormsModule,
        NzButtonModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        NzGridModule

    ]
})
export class LoginRegistrationModule {
}
