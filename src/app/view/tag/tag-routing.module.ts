import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TagComponent} from './tag.component';

const routes: Routes = [
    {path: ':tag', component: TagComponent},
    {path: '**', component: TagComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class TagRoutingModule {
}
