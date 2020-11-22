import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {AdminHeaderComponent} from '../../components/admin-header/admin-header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './auth.guard';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';

@NgModule({
    declarations: [
        AdminHeaderComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NzSpaceModule,
        ReactiveFormsModule,
        NzAvatarModule,
        NzButtonModule,
        NzLayoutModule,
        NzMenuModule,
        NzIconModule,
        NzCardModule,
        NzDividerModule,
        NzUploadModule,
        NzToolTipModule,
        NzTypographyModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        NzDescriptionsModule,
        NzDrawerModule
    ],
    providers: [AuthGuard]
})
export class AdminModule {
}
