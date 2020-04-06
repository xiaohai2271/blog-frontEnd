import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {path: '', pathMatch: 'full', loadChildren: () => import('./view/index/index.module').then(mod => mod.IndexModule)},
    {path: 'update', loadChildren: () => import('./view/update/update.module').then(mod => mod.UpdateModule)},
    {path: 'article/:id', loadChildren: () => import('./view/article/article.module').then(mod => mod.ArticleModule)},
    {path: 'tags', loadChildren: () => import('./view/tag/tag.module').then(mod => mod.TagModule)},
    {path: 'categories', loadChildren: () => import('./view/category/category.module').then(mod => mod.CategoryModule)},
    // {path: 'leaveMsg', loadChildren: () => import('./view/leave-msg/leave-msg.module').then(mod => mod.LeaveMsgModule)},
    {path: 'emailVerify', loadChildren: () => import('./view/email-verify/email-verify.module').then(mod => mod.EmailVerifyModule)},
    {path: 'resetPwd', loadChildren: () => import('./view/reset-pwd/reset-pwd.module').then(mod => mod.ResetPwdModule)},
    {path: 'write', loadChildren: () => import('./view/write/write.module').then(mod => mod.WriteModule)},
    {path: 'links', loadChildren: () => import('./view/link/link.module').then(mod => mod.LinkModule)},
    {
        path: 'user', loadChildren: () => import('./view/login-registration/login-registration.module')
            .then(mod => mod.LoginRegistrationModule)
    },
    {path: '**', loadChildren: () => import('./view/page-not-found/page-not-found.module').then(mod => mod.PageNotFoundModule)}
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
