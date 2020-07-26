import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WriteComponent} from './write.component';
import {Route, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorMdDirective} from './editor-md/editor-md.directive';
import {PublishFormComponent} from './components/publish-form/publish-form.component';
import {
    NzButtonModule, NzCardModule, NzDividerModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzRadioModule,
    NzSelectModule,
    NzTagModule
} from 'ng-zorro-antd';
import {EditableTagModule} from '../admin/components/editable-tag/editable-tag.module';

const routes: Route[] = [
    {path: '**', component: WriteComponent}
];


@NgModule({
    declarations: [WriteComponent, EditorMdDirective, PublishFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        NzButtonModule,
        NzModalModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzTagModule,
        NzIconModule,
        NzRadioModule,
        NzSelectModule,
        NzCardModule,
        NzDividerModule,
        EditableTagModule
    ]
})
export class WriteModule {
}
