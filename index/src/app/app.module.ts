import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

import {EditorMdDirective} from './pages/write/editor/editor-md.directive';

// components
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

// pages
import {IndexComponent} from './pages/index/index.component';
import {UpdateComponent} from './pages/update/update.component';
import {CategoryComponent} from './pages/categories/category.component';
import {TagComponent} from './pages/tag/tag.component';
import {LeaveMsgComponent} from './pages/leave-msg/leave-msg.component';
import {PartnerSitesComponent} from './pages/partner-sites/partner-sites.component';
import {ArticleComponent} from './pages/article/article.component';
import {EmailVerifyComponent} from './pages/email-verify/email-verify.component';
import {ResetPwdComponent} from './pages/reset-pwd/reset-pwd.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './pages/login/login.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {WriteComponent} from './pages/write/write.component';

// services
import {HttpService} from './services/http.service';
import {UserService} from './services/user/user.service';
import {ArticleService} from './services/article/article.service';
import {CategoryService} from './services/category/category.service';
import {CountService} from './services/count/count.service';
import {CommentService} from './services/comment/comment.service';
import {TagService} from './services/tag/tag.service';
import {WebUpdateService} from './services/update/web-update.service';
import {LinkService} from './services/link/link.service';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EditorMdDirective,

    IndexComponent,
    UpdateComponent,
    CategoryComponent,
    TagComponent,
    LeaveMsgComponent,
    PartnerSitesComponent,
    ArticleComponent,
    EmailVerifyComponent,
    ResetPwdComponent,
    NotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    WriteComponent

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
    HttpService,
    UserService,
    ArticleService,
    CountService,
    CommentService,
    TagService,
    WebUpdateService,
    CategoryService,
    LinkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
