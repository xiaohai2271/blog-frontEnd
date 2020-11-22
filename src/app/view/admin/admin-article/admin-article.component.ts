import {Component, OnInit, ViewChild} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {ApiService} from '../../../api/api.service';
import {RequestObj} from '../../../class/HttpReqAndResp';
import {Article} from '../../../class/Article';
import {Title} from '@angular/platform-browser';
import {Data} from '../components/common-table/data';
import {CommonTableComponent} from '../components/common-table/common-table.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin-article',
    templateUrl: './admin-article.component.html'
})
export class AdminArticleComponent implements OnInit {

    constructor(private apiService: ApiService, private nzMessage: NzMessageService, private title: Title,
                private router: Router) {
        this.request = {
            path: '/admin/articles',
            method: 'GET',
            queryParam: {
                page: 1,
                count: 10
            }
        }
    }

    request: RequestObj;
    headData: Data<Article>[]
    @ViewChild('commonTableComponent') private commonTableComponent: CommonTableComponent<Article>

    ngOnInit(): void {
        this.title.setTitle('小海博客 | 文章管理')
        this.headData = [
            {title: '主键', fieldValue: 'id', show: false, primaryKey: true},
            {title: '标题', fieldValue: 'title', show: true},
            {title: '分类', fieldValue: 'category', show: true},
            {title: '文章类型', fieldValue: 'original', show: true},
            {title: '阅读量', fieldValue: 'readingNumber', show: true},
            {title: '👍数', fieldValue: 'likeCount', show: true},
            {title: '👎数', fieldValue: 'dislikeCount', show: true},
            {title: '发布日期', fieldValue: 'publishDateFormat', show: true},
            {title: '更新日期', fieldValue: 'updateDateFormat', show: true},
            {title: '状态', fieldValue: 'open', show: true},
            {title: '简介', fieldValue: 'summary', show: false},
            {title: '作者', fieldValue: 'author.displayName', show: false},
            {title: '标签数', fieldValue: 'tags.length', show: false},
            {
                title: '操作', fieldValue: '', show: true, isActionColumns: true,
                action: [
                    {name: '查看', click: (d) => this.router.navigateByUrl(`/article/${d.id}`)},
                    {name: '删除', color: '#ff0000', needConfirm: true, click: (d) => this.deleteArticle(d)},
                    {name: '编辑', color: '#2db7f5', click: (d) => this.router.navigateByUrl(`/write?id=${d.id}`)},
                ]
            }
        ]
    }

    deleteArticle(article: Article) {
        this.apiService.deleteArticle(article.id).subscribe({
            next: data => {
                this.nzMessage.success('删除成功')
                this.commonTableComponent.getData();
            },
            error: err => {
                this.nzMessage.error(err.msg)
            }
        })
    }
}
