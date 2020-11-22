import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Category, Tag} from '../../../class/Tag';
import {ApiService} from '../../../api/api.service';
import {RequestObj} from '../../../class/HttpReqAndResp';
import {Title} from '@angular/platform-browser';
import {Data} from '../components/common-table/data';
import {CommonTableComponent} from '../components/common-table/common-table.component';
import {Router} from '@angular/router';
import {EditableTagComponent} from '../components/editable-tag/editable-tag.component';

@Component({
    selector: 'app-admin-tag',
    templateUrl: './admin-tag.component.html'
})
export class AdminTagComponent implements OnInit {

    categoryCTData: { headData: Data<Category>[], commonTable: CommonTableComponent<Category>, request: RequestObj } = {
        headData: null,
        commonTable: null,
        request: null
    }
    tagCTData: { headData: Data<Category>[], commonTable: CommonTableComponent<Tag>, request: RequestObj } = {
        headData: null,
        commonTable: null,
        request: null
    }
    @ViewChild('categoryCTComponent', {static: true}) categoryCTComponent: CommonTableComponent<Category>
    @ViewChild('tagCTComponent', {static: true}) tagCTComponent: CommonTableComponent<Tag>
    @ViewChild('editableTagComponent') editableTagComponent: EditableTagComponent
    getData: any;
    private updateData: any;

    constructor(private apiService: ApiService, private nzMessageService: NzMessageService, private title: Title, private router: Router) {
    }

    ngOnInit(): void {
        this.title.setTitle('小海博客 | 标签分类管理')
        this.categoryCTData = {
            commonTable: this.categoryCTComponent,
            headData: [
                {fieldValue: 'id', title: '主键', show: false, primaryKey: true},
                {fieldValue: 'name', title: '分类名', show: true},
                {fieldValue: 'articles.length', title: '文章数量', show: true},
                {
                    fieldValue: '', title: '操作', isActionColumns: true, show: true,
                    action: [
                        {name: '查看', click: (data) => this.router.navigateByUrl(`/categories/${data.name}`)},
                        {name: '编辑', color: 'blue', click: (data) => this.editableTagComponent.getFocus(data.id)},
                        {
                            name: '删除',
                            color: 'red',
                            needConfirm: true,
                            click: (data) => this.delete(data.id, 'category')
                        },
                    ]
                },
            ],
            request: {
                path: '/categories',
                method: 'GET',
                queryParam: {
                    page: 1,
                    count: 1000
                }
            }
        }
        this.tagCTData = {
            commonTable: this.tagCTComponent,
            headData: [
                {fieldValue: 'id', primaryKey: true, show: false, title: '主键'},
                {fieldValue: 'name', show: true, title: '标签名'},
                {
                    fieldValue: '', show: true, title: '操作', isActionColumns: true, action: [
                        {name: '查看', click: data => this.router.navigateByUrl(`/tags/${data.name}`)},
                        {name: '编辑', color: 'blue', click: data => this.editableTagComponent.getFocus(data.id)},
                        {name: '删除', color: 'red', needConfirm: true, click: data => this.delete(data.id, 'tag')},
                    ]
                },

            ],
            request: {
                path: '/tags',
                method: 'GET',
                queryParam: {
                    page: 1,
                    count: 10
                }
            }
        }
        this.getData = this.categoryCTComponent.getData;
    }


    delete(id, mode: 'tag' | 'category') {
        if (mode === 'tag') {
            this.apiService.deleteTag(id).subscribe({
                next: data => {
                    this.nzMessageService.success('删除成功')
                    this.tagCTComponent.getData();
                },
                complete: () => null,
                error: err => this.nzMessageService.error(err.msg)
            })
        } else if (mode === 'category') {
            this.apiService.deleteCategory(id).subscribe({
                next: data => {
                    this.nzMessageService.success('删除成功')
                    this.categoryCTComponent.getData();
                },
                complete: () => null,
                error: err => this.nzMessageService.error(err.msg)
            })
        }
    }

    addCategory($event: { value: string; originalValue: string; changed: boolean }) {
        if (!$event.value || !$event.changed) return
        this.apiService.createCategory($event.value).subscribe({
            next: data => {
                this.nzMessageService.success('新增成功')
                this.getData = this.categoryCTComponent.getData();
            },
            complete: () => null,
            error: err => this.nzMessageService.error(err.msg)
        });

    }

    tabChanged(mode: 'tag' | 'category') {
        if (mode === 'tag') {
            this.getData = this.categoryCTComponent.getData;
            this.updateData = this.apiService.updateTag;
        } else {
            this.getData = this.tagCTComponent.getData;
            this.updateData = this.apiService.updateCategory
        }
    }

    textChange(value: { value: string; originalValue: string; changed: boolean }, textData: Category | Tag) {
        this.updateData(textData.id, value.value).subscribe({
            next: data => {
                this.nzMessageService.success('更新成功')
                this.tagCTComponent.getData();
                this.categoryCTComponent.getData();
            },
            complete: () => null,
            error: err => this.nzMessageService.error(err.msg)
        });
    }
}
