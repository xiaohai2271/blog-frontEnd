import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditableTagComponent} from './editable-tag.component';
import {NzIconModule, NzInputModule, NzTagModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [EditableTagComponent],
    exports: [
        EditableTagComponent
    ],
    imports: [
        CommonModule,
        NzTagModule,
        FormsModule,
        NzInputModule,
        NzIconModule
    ]
})
export class EditableTagModule {
}
