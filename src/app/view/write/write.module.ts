import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WriteComponent} from './write.component';
import {Route, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PublishFormComponent} from './components/publish-form/publish-form.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {EditableTagModule} from '../admin/components/editable-tag/editable-tag.module';

const routes: Route[] = [
    {path: '**', component: WriteComponent}
];


@NgModule({
    declarations: [WriteComponent, PublishFormComponent],
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
