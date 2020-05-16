import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminDashboardComponent} from './admin-dashboard.component';
import {RouterModule} from '@angular/router';
import {
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzSpinModule,
    NzStatisticModule
} from 'ng-zorro-antd';


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
