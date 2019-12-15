import {NgModule} from '@angular/core';
import {NavigationStart, Router, RouterModule, Routes} from '@angular/router';
import {filter} from 'rxjs/operators';
import {UserService} from './services/user/user.service';

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


const routes: Routes = [
    {path: '', component: AIndexComponent},
    {path: 'articles', component: ArticleManagerComponent},
    {path: 'comments', component: CommentManagerComponent},
    {path: 'tags', component: TagManagerComponent},
    {path: 'userInfo', component: UserInfoComponent},
    {path: 'categories', component: CategoryManagerComponent},
    {path: 'links', component: LinksManagerComponent},
    {path: 'visitors', component: VisitorManagerComponent},
    {path: 'update', component: UpdateManagerComponent},
    {path: 'users', component: UserManagerComponent},
    {path: '**', component: AIndexComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

    // todo ： 换用路由守卫
    constructor(private router: Router, private userService: UserService) {
        this.router.events.pipe(filter((event) => event instanceof NavigationStart)
        ).subscribe((event: NavigationStart) => {
            if (!this.userService.userInfo) {
                this.userService.getUserInfo().subscribe(data => {
                    if (data.code === 0) {
                        this.userService.userInfo = data.result;
                        this.checkPermission(event);
                    } else if (data.code === 301) {
                        window.location.href = '/login';
                    } else {
                        window.location.href = '/';
                    }
                });
            } else {
                this.checkPermission(event);
            }
        });
    }

    private checkPermission(event) {
        if (this.userService.userInfo.role === 'user') {
            switch (event.url) {
                case '/':
                case '/comments':
                case '/userInfo':
                    break;
                default :
                    this.router.navigateByUrl('/');
            }
        }
    }
}
