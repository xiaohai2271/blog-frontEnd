import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkComponent} from './link.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
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
