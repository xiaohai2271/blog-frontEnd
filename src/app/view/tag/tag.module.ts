import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagComponent} from './tag.component';
import {TagRoutingModule} from './tag-routing.module';
import {IndexModule} from '../index/index.module';


@NgModule({
    declarations: [TagComponent],
    imports: [
        CommonModule,
        TagRoutingModule,
        IndexModule
    ]
})
export class TagModule {
}
