import {BrowserModule} from '@angular/platform-browser';
import {forwardRef, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginRegistrationModule} from './view/login-registration/login-registration.module';
import {AdminModule} from './view/admin/admin.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HttpService} from './api/http/http.service';
import {ErrorService} from './services/error.service';
import {ComponentStateService} from './services/component-state.service';
import {GlobalUserService} from './services/global-user.service';
import {LocalStorageService} from './services/local-storage.service';
import {ApiService} from './api/api.service';


registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LoginRegistrationModule,
        AdminModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
    ],
    providers: [
        ComponentStateService,
        GlobalUserService,
        LocalStorageService,
        HttpService,
        ApiService,
        ErrorService,
        {provide: NZ_I18N, useValue: zh_CN},
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
