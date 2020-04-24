import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminIndexComponent} from './admin-index/admin-index.component';
import {AdminCommentComponent} from './admin-comment/admin-comment.component';
import {AdminArticleComponent} from './admin-article/admin-article.component';
import {AdminCategoryComponent} from './admin-category/admin-category.component';
import {AdminLinkComponent} from './admin-link/admin-link.component';
import {AdminTagComponent} from './admin-tag/admin-tag.component';
import {AdminUpdateComponent} from './admin-update/admin-update.component';
import {AdminUserComponent} from './admin-user/admin-user.component';
import {AdminUserinfoComponent} from './admin-userinfo/admin-userinfo.component';
import {AdminVisitorComponent} from './admin-visitor/admin-visitor.component';
import {AdminComponent} from './admin.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: 'article', component: AdminArticleComponent, canActivate: [AuthGuard]},
            {path: 'comment', component: AdminCommentComponent, canActivate: [AuthGuard]},
            {path: 'category', component: AdminCategoryComponent, canActivate: [AuthGuard]},
            {path: 'link', component: AdminLinkComponent, canActivate: [AuthGuard]},
            {path: 'tag', component: AdminTagComponent, canActivate: [AuthGuard]},
            {path: 'update', component: AdminUpdateComponent, canActivate: [AuthGuard]},
            {path: 'user', component: AdminUserComponent, canActivate: [AuthGuard]},
            {path: 'userInfo', component: AdminUserinfoComponent, canActivate: [AuthGuard]},
            {path: 'visitor', component: AdminVisitorComponent, canActivate: [AuthGuard]},
            {path: '**', component: AdminIndexComponent, canActivate: [AuthGuard]}
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
