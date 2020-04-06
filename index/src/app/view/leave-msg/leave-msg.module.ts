import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeaveMsgRoutingModule} from './leave-msg-routing.module';
import {LeaveMsgComponent} from './leave-msg.component';


@NgModule({
    declarations: [LeaveMsgComponent],
    imports: [
        CommonModule,
        LeaveMsgRoutingModule
    ]
})
export class LeaveMsgModule {
}
