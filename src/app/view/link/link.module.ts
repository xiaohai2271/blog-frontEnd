import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkComponent} from './link.component';
import {NzButtonModule, NzIconModule, NzInputModule, NzModalModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [LinkComponent],
    imports: [
        CommonModule,
        NzIconModule,
        NzModalModule,
        FormsModule,
        NzButtonModule,
        NzInputModule,
        RouterModule.forChild([{path: '**', component: LinkComponent}])
    ]
})
export class LinkModule {
}
