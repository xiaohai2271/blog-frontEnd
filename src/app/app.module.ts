import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
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
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzBackTopModule} from 'ng-zorro-antd/back-top';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzDividerModule} from 'ng-zorro-antd/divider';


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
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LoginRegistrationModule,
        AdminModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        NzBackTopModule,
        NzModalModule,
        NzDropDownModule,
        NzIconModule,
        NzAvatarModule,
        NzButtonModule,
        NzGridModule,
        NzDividerModule
    ],
    providers: [
        ComponentStateService,
        GlobalUserService,
        LocalStorageService,
        HttpService,
        ApiService,
        NzMessageService,
        NzNotificationService,
        ErrorService,
        {provide: NZ_I18N, useValue: zh_CN},
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
