import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../../../api/api.service';
import {PageList} from '../../../class/HttpReqAndResp';
import {Article} from '../../../class/Article';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-admin-article',
    templateUrl: './admin-article.component.html',
    styleUrls: ['./admin-article.component.less']
})
export class AdminArticleComponent implements OnInit {

    constructor(private apiService: ApiService, private nzMessage: NzMessageService, private title: Title) {
    }

    page: number = 1;
    pageSize: number = 10;

    pageList: PageList<Article> = new PageList<Article>();

    loading: boolean = true;

    ngOnInit(): void {
        this.title.setTitle('小海博客 | 文章管理')
        this.getArticle();
    }

    getArticle = () => this.apiService.adminArticles(this.page, this.pageSize).subscribe({
        next: data => this.pageList = data.result,
        complete: () => this.loading = false,
        error: err => this.loading = false
    })

    deleteArticle(id) {
        this.loading = true;
        this.apiService.deleteArticle(id).subscribe({
            next: data => {
                this.nzMessage.success('删除成功')
                this.loading = false;
                this.getArticle();
            },
            error: err => {
                this.nzMessage.error(err.msg)
                this.loading = false
            }
        })
    }
}
