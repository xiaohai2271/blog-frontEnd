import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {AdminHeaderComponent} from '../../components/admin-header/admin-header.component';


@NgModule({
    declarations: [
        AdminHeaderComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NgZorroAntdModule,
        NzSpaceModule
    ]
})
export class AdminModule {
}
