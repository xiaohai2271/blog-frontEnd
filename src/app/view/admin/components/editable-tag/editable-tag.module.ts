import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditableTagComponent} from './editable-tag.component';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzTagModule} from 'ng-zorro-antd/tag';
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
