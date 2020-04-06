import {Component, OnInit} from '@angular/core';
import {Category} from '../../class/Category';
import {PageList} from '../../class/pageList';
import {Article} from '../../class/Article';
import {Tag} from '../../class/Tag';
import {ApiService} from '../../api/api.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'view-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.less']
})
export class TagComponent implements OnInit {

    constructor(private apiService: ApiService,
                private nzMessageService: NzMessageService,
                private location: Location,
                private activatedRoute: ActivatedRoute,
                private title: Title) {
    }

    tagList: { name: string, size: number } [] = [];
    private tag: { name: string, size: number };
    articleList: PageList<Article>;

    name: string;

    ngOnInit() {
        this.name = this.activatedRoute.snapshot.paramMap.get('tag');
        this.getTags(this.name == null);
        if (this.name != null) {
            this.getArticles(this.name);
        }
    }

    getTags(needGetArticle: boolean) {
        this.apiService.tagsNac().subscribe(data => {
            this.tagList = data.result;
            this.tag = data.result[0];
            if (needGetArticle) {
                this.getArticles(this.tag.name);
                this.name = this.tag.name;
                this.title.setTitle('小海博客 | 标签 | ' + this.name);
            }
        }, error => {
            this.nzMessageService.error('出现了错误，原因：' + error.msg);
        });
    }

    getArticles(tagName: string) {
        this.apiService.articlesByTag(tagName).subscribe(data => {
            this.articleList = data.result;
        }, error => {
            this.nzMessageService.error('出现了错误，原因：' + error.msg);
        });
    }

    changeTag(tag: { name: string, size: number }) {
        if (this.name === tag.name) {
            return;
        }
        this.tag = tag;
        this.name = tag.name;
        this.location.replaceState('tags/' + this.name);
        this.getArticles(this.name);
        this.title.setTitle('小海博客 | 标签 | ' + this.name);
    }
}
