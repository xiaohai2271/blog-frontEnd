import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleService} from '../../services/article/article.service';

@Component({
    selector: 'app-article-manager',
    templateUrl: './article-manager.component.html',
    styleUrls: ['./article-manager.component.css']
})
export class ArticleManagerComponent implements OnInit {

    constructor(private message: NzMessageService,
                public articleService: ArticleService) {

    }


    public pageNum = 1;

    public pageSize = 10;

    showPupup = false;

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.articleService.getArticle(this.pageNum, this.pageSize);
    }


    doDel(id) {
        this.showPupup = false;
        this.articleService.deleteArticle(id).subscribe(data => {
            if (data.code === 0) {
                this.message.success('删除成功');
                this.getData();
            } else {
                this.message.error('失败，原因：' + data.msg);
            }
        });
    }

    toPage(e: number) {
        this.pageNum = e;
        this.getData();
    }

}
