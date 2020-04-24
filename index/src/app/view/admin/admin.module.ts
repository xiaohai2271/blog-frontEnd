import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminIndexComponent} from './admin-index/admin-index.component';
import {AdminArticleComponent} from './admin-article/admin-article.component';
import {AdminCategoryComponent} from './admin-category/admin-category.component';
import {AdminCommentComponent} from './admin-comment/admin-comment.component';
import {AdminTagComponent} from './admin-tag/admin-tag.component';
import {AdminLinkComponent} from './admin-link/admin-link.component';
import {AdminUpdateComponent} from './admin-update/admin-update.component';
import {AdminUserComponent} from './admin-user/admin-user.component';
import {AdminUserinfoComponent} from './admin-userinfo/admin-userinfo.component';
import {AdminVisitorComponent} from './admin-visitor/admin-visitor.component';
import { AdminComponent } from './admin.component';


@NgModule({
    declarations: [
        AdminIndexComponent,
        AdminArticleComponent,
        AdminCategoryComponent,
        AdminCommentComponent,
        AdminTagComponent,
        AdminLinkComponent,
        AdminUpdateComponent,
        AdminUserComponent,
        AdminUserinfoComponent,
        AdminVisitorComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ]
})
export class AdminModule {
}
