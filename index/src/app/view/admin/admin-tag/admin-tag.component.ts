import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Category, Tag} from '../../../class/Tag';
import {ApiService} from '../../../api/api.service';
import {PageList} from '../../../class/HttpReqAndResp';

@Component({
    selector: 'app-admin-tag',
    templateUrl: './admin-tag.component.html',
    styleUrls: ['./admin-tag.component.less']
})
export class AdminTagComponent implements OnInit {

    constructor(private apiService: ApiService, private nzMessageService: NzMessageService) {
    }

    loading: boolean = true;

    categoryList: Category[] = [];
    editInfo = {
        id: null,
        name: null,
        editFocus: false,
        isAdd: false
    }
    tagPageList: PageList<Tag> = new PageList<Tag>();

    pageIndex: number = 1;
    pageSize: number = 10;


    ngOnInit(): void {
        this.getCategory();
        this.getTag();
    }

    getCategory = () => this.apiService.categories().subscribe({
        next: data => this.categoryList = data.result,
        complete: () => this.loading = false,
        error: err => this.loading = false
    })

    getTag = () => this.apiService.tags(this.pageIndex, this.pageSize).subscribe({
        next: data => this.tagPageList = data.result,
        complete: () => this.loading = false,
        error: err => this.loading = false
    })

    delete(id, mode: 'tag' | 'category') {
        this.loading = true;
        if (mode === 'tag') {
            this.apiService.deleteTag(id).subscribe({
                next: data => {
                    this.nzMessageService.success('删除成功')
                    this.getTag();
                },
                complete: () => this.loading = false,
                error: err => {
                    this.nzMessageService.error(err.msg)
                    this.loading = false
                }
            })
        } else if (mode === 'category') {
            this.apiService.deleteCategory(id).subscribe({
                next: data => {
                    this.nzMessageService.success('删除成功')
                    this.getCategory();
                },
                complete: () => this.loading = false,
                error: err => {
                    this.nzMessageService.error(err.msg)
                    this.loading = false
                }
            })
        }
    }

    editFocus(data: Category) {
        this.editInfo.isAdd = false;
        this.editInfo.id = data.id;
        this.editInfo.name = data.name;
        this.editInfo.editFocus = true;
    }

    edit(mode: 'tag' | 'category') {
        this.loading = true;
        if (mode === 'tag') {
            this.apiService.updateTag(this.editInfo.id, this.editInfo.name).subscribe({
                next: data => {
                    this.nzMessageService.success('更新成功')
                    this.getTag();
                },
                complete: () => this.loading = false,
                error: err => {
                    this.nzMessageService.error(err.msg)
                    this.loading = false
                }
            })
        } else if (mode === 'category') {
            this.apiService.updateCategory(this.editInfo.id, this.editInfo.name).subscribe({
                next: data => {
                    this.nzMessageService.success('更新成功')
                    this.getCategory();
                },
                complete: () => this.loading = false,
                error: err => {
                    this.nzMessageService.error(err.msg)
                    this.loading = false
                }
            })
        }
        this.editInfo.editFocus = false
        this.editInfo.name = null
    }

    addCategory() {
        this.editInfo.isAdd = true
        if (!this.editInfo.editFocus && this.editInfo.isAdd) {
            this.editInfo.name = null;
            this.editInfo.id = null;
            this.editInfo.editFocus = true;
            return
        }
        this.apiService.createCategory(this.editInfo.name).subscribe({
            next: data => {
                this.nzMessageService.success('新增成功')
                this.getCategory();
            },
            complete: () => this.loading = false,
            error: err => {
                this.nzMessageService.error(err.msg)
                this.loading = false
            }
        });
        this.editInfo.editFocus = false
        this.editInfo.isAdd = false
        this.editInfo.name = null
    }
}
