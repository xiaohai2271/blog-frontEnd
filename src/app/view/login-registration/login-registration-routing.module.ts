import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginRegistrationComponent} from './login-registration.component';

const routes: Routes = [
    {
        path: '',
        component: LoginRegistrationComponent,
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'registration', component: RegistrationComponent},
            {path: '**', component: LoginComponent}
        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class LoginRegistrationRoutingModule {
}
