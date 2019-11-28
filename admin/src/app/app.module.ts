import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


// components
import {HeaderComponent} from './components/header/header.component';
// pages
import {AIndexComponent} from './pages/a-index/a-index.component';
import {ArticleManagerComponent} from './pages/article-manager/article-manager.component';
import {CommentManagerComponent} from './pages/comment-manager/comment-manager.component';
import {TagManagerComponent} from './pages/tag-manager/tag-manager.component';
import {UserInfoComponent} from './pages/user-info/user-info.component';
import {CategoryManagerComponent} from './pages/category-manager/category-manager.component';
import {LinksManagerComponent} from './pages/links-manager/links.component';
import {VisitorManagerComponent} from './pages/visitor-manager/visitor-manager.component';
import {UpdateManagerComponent} from './pages/update-manager/update.component';
import {UserManagerComponent} from './pages/user-manager/user-manager.component';
// services
import {HttpService} from './services/http.service';


registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,

        HeaderComponent,
        AIndexComponent,
        ArticleManagerComponent,
        CommentManagerComponent,
        TagManagerComponent,
        UserInfoComponent,
        CategoryManagerComponent,
        LinksManagerComponent,
        VisitorManagerComponent,
        UpdateManagerComponent,
        UserManagerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        {provide: NZ_I18N, useValue: zh_CN},
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
