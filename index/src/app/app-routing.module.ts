import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

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
import {WriteComponent} from './pages/write/write.component';
import {LoginComponent} from './pages/login/login.component';
import {RegistrationComponent} from './pages/registration/registration.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'update', component: UpdateComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'tag', component: TagComponent},
  {path: 'leaveMsg', component: LeaveMsgComponent},
  {path: 'links', component: PartnerSitesComponent},
  {path: 'article/:id', component: ArticleComponent},
  {path: 'write', component: WriteComponent},
  {path: 'resetPwd', component: ResetPwdComponent},
  {path: 'emailVerify', component: EmailVerifyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

// TODO lazyLoad
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
