import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'article',
                loadChildren: () => import('./admin-article/admin-article.module').then(mod => mod.AdminArticleModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'comment',
                loadChildren: () => import('./admin-comment/admin-comment.module').then(mod => mod.AdminCommentModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'category',
                loadChildren: () => import('./admin-category/admin-category.module').then(mod => mod.AdminCategoryModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'link',
                loadChildren: () => import('./admin-link/admin-link.module').then(mod => mod.AdminLinkModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'tag',
                loadChildren: () => import('./admin-tag/admin-tag.module').then(mod => mod.AdminTagModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'update',
                loadChildren: () => import('./admin-update/admin-update.module').then(mod => mod.AdminUpdateModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'user',
                loadChildren: () => import('./admin-user/admin-user.module').then(mod => mod.AdminUserModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'userInfo',
                loadChildren: () => import('./admin-userInfo/admin-userInfo.module').then(mod => mod.AdminUserinfoModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'visitor',
                loadChildren: () => import('./admin-visitor/admin-visitor.module').then(mod => mod.AdminVisitorModule),
                canActivate: [AuthGuard]
            },
            {
                path: '**',
                loadChildren: () => import('./admin-index/admin-index.module').then(mod => mod.AdminIndexModule),
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AdminRoutingModule {
}
