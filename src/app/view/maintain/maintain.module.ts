import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaintainComponent} from './maintain.component';
import {RouterModule} from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';


@NgModule({
    declarations: [MaintainComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: MaintainComponent}]),
        NzResultModule,
        NzButtonModule
    ]
})
export class MaintainModule {
}
