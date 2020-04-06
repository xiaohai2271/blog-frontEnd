import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api/api.service';
import {Category} from '../../class/Category';
import {NzMessageService} from 'ng-zorro-antd';
import {PageList} from '../../class/pageList';
import {Article} from '../../class/Article';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'view-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

    constructor(private apiService: ApiService,
                private nzMessageService: NzMessageService,
                private activatedRoute: ActivatedRoute,
                private location: Location,
                private title: Title) {
    }

    categoryList: Category[] = [];
    private category: Category;
    articleList: PageList<Article>;

    name: string;

    ngOnInit() {
        this.name = this.activatedRoute.snapshot.paramMap.get('category');
        this.getCategories(this.name == null);
        if (this.name != null) {
            this.getArticles(this.name);
        }
    }

    getCategories(needGetArticle: boolean) {
        this.apiService.categories().subscribe(data => {
            this.categoryList = data.result;
            this.category = data.result[0];
            if (needGetArticle) {
                this.getArticles(this.category.name);
                this.name = this.category.name;
                this.title.setTitle('小海博客 | 分类 | ' + this.name);
            }
        }, error => {
            this.nzMessageService.error('出现了错误，原因：' + error.msg);
        });
    }

    getArticles(categoryName: string) {
        this.apiService.articlesByCategory(categoryName).subscribe(data => {
            this.articleList = data.result;
        }, error => {
            this.nzMessageService.error('出现了错误，原因：' + error.msg);
        });
    }

    changeCategory(category: Category) {
        if (this.name === category.name) {
            return;
        }
        this.category = category;
        this.name = category.name;
        this.location.replaceState('categories/' + this.name);
        this.getArticles(this.name);
        this.title.setTitle('小海博客 | 分类 | ' + this.name);
    }
}
