import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginRegistrationRoutingModule} from './login-registration-routing.module';
import {LoginRegistrationComponent} from './login-registration.component';
import {FormsModule} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';


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
