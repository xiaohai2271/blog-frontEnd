import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeaveMsgComponent} from './leave-msg.component';

const routes: Routes = [
    {path: '**', component: LeaveMsgComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class LeaveMsgRoutingModule {
}
