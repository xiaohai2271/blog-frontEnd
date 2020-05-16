import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkComponent} from './link.component';
import {LinkRoutingModule} from './link-routing.module';
import {NzButtonModule, NzIconModule, NzInputModule, NzModalModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [LinkComponent],
    imports: [
        CommonModule,
        LinkRoutingModule,
        NzIconModule,
        NzModalModule,
        FormsModule,
        NzButtonModule,
        NzInputModule
    ]
})
export class LinkModule {
}
