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


const routes: Routes = [
    {path: 'article', component: AdminArticleComponent},
    {path: 'comment', component: AdminCommentComponent},
    {path: 'category', component: AdminCategoryComponent},
    {path: 'link', component: AdminLinkComponent},
    {path: 'tag', component: AdminTagComponent},
    {path: 'update', component: AdminUpdateComponent},
    {path: 'user', component: AdminUserComponent},
    {path: 'userInfo', component: AdminUserinfoComponent},
    {path: 'visitor', component: AdminVisitorComponent},
    {path: '**', component: AdminIndexComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AdminRoutingModule {
}
