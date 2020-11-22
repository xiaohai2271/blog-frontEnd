import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {CategoryRoutingModule} from './category-routing.module';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {IndexModule} from '../index/index.module';


@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        NzToolTipModule,
        NzIconModule,
        IndexModule
    ]
})
export class CategoryModule {
}
