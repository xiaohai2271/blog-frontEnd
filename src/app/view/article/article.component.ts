import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api/api.service';
import {Article} from '../../class/Article';
import {Title} from '@angular/platform-browser';
import {User} from '../../class/User';
import {Comment, CommentReq} from '../../class/Comment';
import {PageList} from '../../class/HttpReqAndResp';
import {GlobalUserService} from '../../services/global-user.service';
import VditorPreview from 'vditor/dist/method.min';

declare let $;

@Component({
    selector: 'view-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {

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
    @ViewChild('divElement') divElement: ElementRef;

    constructor(private activatedRoute: ActivatedRoute,
                private apiService: ApiService,
                private userService: GlobalUserService,
                private titleService: Title,
                private router: Router) {
        this.articleId = +activatedRoute.snapshot.paramMap.get('id');
    }

    // private vditor: Vditor;

    ngOnInit() {
        this.toArticle(this.articleId);
        this.userService.watchUserInfo({
            complete: () => null,
            error: (err) => null,
            next: data => {
                this.user = data.result;
                if (data.result) {this.avatarImgUrl = data.result.avatarImgUrl;}
            }
        });
        this.comment = new CommentReq(`article/${this.articleId}`);
    }

    parseMd(md: string) {
        const option: IPreviewOptions = {
            anchor: 1,
            hljs: {
                lineNumber: true
            },
            markdown: {
                autoSpace: true,
                fixTermTypo: true,
                chinesePunct: true,
                linkBase: location.href,
                toc: true,
                mark: true
            },
            after: () => {
                //  处理锚点
                const tocList: HTMLCollection = this.divElement.nativeElement
                    .getElementsByClassName('vditor-toc')[0]?.getElementsByTagName(`a`);
                for (let i = 0; i < tocList?.length; i++) {
                    const linkValue = tocList.item(i).getAttribute('href');
                    tocList.item(i).setAttribute('href', window.location.pathname + linkValue);
                }
            }
        };
        VditorPreview.preview(this.divElement.nativeElement, md, option);
    }

    toArticle(id: number) {
        this.commentPage = null;
        this.router.navigateByUrl('/article/' + id);
        this.apiService.getArticle(id).subscribe({
            next: data => {
                this.apiService.comments(`article+${id}`).subscribe(commData => {
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
