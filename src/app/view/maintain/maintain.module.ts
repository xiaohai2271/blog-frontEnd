import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaintainComponent} from './maintain.component';
import {RouterModule} from '@angular/router';
import {NzButtonModule, NzResultModule} from 'ng-zorro-antd';


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
