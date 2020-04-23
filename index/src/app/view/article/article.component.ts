import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api/api.service';
import {Article} from '../../class/Article';
import {Title} from '@angular/platform-browser';
import {User} from '../../class/User';
import {CommentReq} from '../../class/Comment';
import {PageList} from '../../class/HttpReqAndResp';
import {Comment} from '../../class/Comment';

declare var editormd;
declare var $;

@Component({
    selector: 'view-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
                private apiService: ApiService,
                private titleService: Title,
                private router: Router) {
        this.articleId = +activatedRoute.snapshot.paramMap.get('id');
    }

    articleId: number;
    article: Article;
    copyRightUrl: string;
    user: User;
    submitting: boolean = false;

    comment: CommentReq;
    // 作为输入框@ 的提示
    name: string;
    commentPage: PageList<Comment>;
    avatarImgUrl: string;
    pid: number;
    content: string;

    ngOnInit() {
        this.toArticle(this.articleId);
        this.apiService.userInfo().subscribe(data => {
            this.user = data.result;
            this.avatarImgUrl = data.result.avatarImgUrl;
        }, error => {
        });
        this.comment = new CommentReq(true);
    }

    parseMd(md: string) {
        editormd.markdownToHTML('article-content', {
            markdown: this.article.mdContent,
            htmlDecode: 'style,script,iframe',  // you can filter tags decode
            toc: false,
            tocm: false,    // Using [TOCM]
            // tocContainer: '#article-slider', // 自定义 ToC 容器层
            // tocDropdown: true,
            emoji: true,
            taskList: true,
            flowChart: true,  // 默认不解析
        });
    }

    toArticle(id: number) {
        this.commentPage = null;
        this.router.navigateByUrl('/article/' + id);
        this.apiService.getArticle(id).subscribe({
            next: data => {
                this.apiService.comments(id).subscribe(commData => {
                    this.commentPage = commData.result;
                });
                document.getElementById('article-content').innerHTML = '';
                this.article = data.result;
                this.parseMd(data.result.mdContent);
                this.titleService.setTitle('小海博客 | ' + data.result.title);
                window.scrollTo(0, 0);
            }
        });
        this.copyRightUrl = location.href;
    }

    // true ==> 一级评论  false ==>二级评论
    submitComment(bool: boolean) {
        this.submitting = true;
        this.comment.articleID = this.articleId;
        if (!bool) {
            this.comment.content = this.content;
            this.comment.pid = this.pid;
        }
        this.apiService.createComment(this.comment).subscribe(data => {
            this.commentPage.list.push(data.result);
            this.comment.content = null;
            this.comment.pid = null;
            this.submitting = false;
        }, error => {
            this.submitting = false;
        });

    }

    resp(id: number, name: string) {
        this.pid = id;
        this.name = name;
    }
}
