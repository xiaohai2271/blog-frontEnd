import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminDashboardComponent} from './admin-dashboard.component';
import {RouterModule} from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';


@NgModule({
    declarations: [AdminDashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: AdminDashboardComponent}]),
        NzGridModule,
        NzCardModule,
        NzButtonModule,
        NzSpinModule,
        NzIconModule,
        NzStatisticModule,
        NzDividerModule
    ]
})
export class AdminDashboardModule {
}
