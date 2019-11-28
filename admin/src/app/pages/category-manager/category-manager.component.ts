import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {CategoryService} from '../../services/category/category.service';

@Component({
    selector: 'app-category-manager',
    templateUrl: './category-manager.component.html',
    styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {

    constructor(public categoryService: CategoryService, private message: NzMessageService) {
    }

    showPupup = false;

    updateReqBody = {
        id: null,
        name: null
    };
    isAddNowOne = false; // 是否是新增分类的标识

    ngOnInit() {
        this.getData();
    }

    getData() {
        if (this.categoryService.categories) {
            return;
        }
        this.categoryService.getAllCategory();
    }

    edit(id, name) {
        this.showPupup = true;
        this.updateReqBody.id = id;
        this.updateReqBody.name = name;
        this.isAddNowOne = false;
    }

    submit() {
        if (this.updateReqBody.name === '') {
            alert('不能修改为空值！');
            return;
        }
        this.showPupup = false;
        if (!this.isAddNowOne) {
            // 更新
            this.categoryService.update(this.updateReqBody).subscribe(data => {
                if (data.code === 0) {
                    this.message.success('修改成功');
                    for (let i = 0; i < this.categoryService.categories.length; i++) {
                        if ( this.categoryService.categories[i].id === this.updateReqBody.id) {
                            this.categoryService.categories[i].name = this.updateReqBody.name;
                        }
                    }
                } else {
                    this.message.error('修改失败，原因：' + data.msg);
                }
            });
        } else {
            // 新建
            this.categoryService.create(this.updateReqBody.name).subscribe(data => {
                if (data.code === 0) {
                    this.message.success('新增成功');
                } else {
                    this.message.error('新增失败，原因：' + data.msg);
                }
            });
        }
    }


    doDel(id) {

        this.categoryService.delete(id).subscribe(data => {
            if (data.code === 0) {
                this.message.success('删除成功');
            } else {
                this.message.error('删除失败，原因：' + data.msg);
            }
        });
    }

    addNewOne() {
        this.showPupup = true;
        this.updateReqBody.name = name;
        this.isAddNowOne = true;
    }

    cancel() {
        this.showPupup = !this.showPupup;
    }

}
