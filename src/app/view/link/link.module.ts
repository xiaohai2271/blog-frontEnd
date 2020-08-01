import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkComponent} from './link.component';
import {NzButtonModule, NzFormModule, NzIconModule, NzInputModule, NzModalModule, NzSelectModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
        RouterModule.forChild([{path: '**', component: LinkComponent}]),
        NzFormModule,
        ReactiveFormsModule,
        NzSelectModule
    ]
})
export class LinkModule {
}
