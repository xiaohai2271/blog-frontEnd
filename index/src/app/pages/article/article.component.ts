import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleService} from '../../services/article/article.service';
import {CommentService} from '../../services/comment/comment.service';
import {UserService} from '../../services/user/user.service';
import {CommentReq} from '../../class/commentReq';
import {Article} from '../../class/article';

declare var editormd;
declare var $;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private articleService: ArticleService,
              private routerinfo: ActivatedRoute,
              private router: Router,
              private message: NzMessageService,
              private titleService: Title,
              private location: Location,
              public commentService: CommentService,
              public userService: UserService) {
  }

  copyRightUrl: string;

  public pageNum: number = 1;
  public pageSize: number = 10;

  public articleId: number;

  public article: Article = new Article();

  public comment4submit: string = '';

  loadOk: boolean = false; // 文章的加载

  loading: boolean = true; // 评论的加载

  relyIndex: number;

  public responseComment: CommentReq;

  public showToc: boolean = true;

  /**
   * editor.md preview
   *
   */
  public preview(markdownContent) {
    editormd.markdownToHTML('content', {
      markdown: markdownContent,
      // htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
      htmlDecode: 'style,script,iframe',  // you can filter tags decode
       toc             : true,
       tocm            : true,    // Using [TOCM]
      tocContainer    : '#article-toc', // 自定义 ToC 容器层
      // gfm             : false,
      tocDropdown: false,
      // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
      emoji: true,
      taskList: true,
      // tex             : true,  //科学公式 默认不解析
      flowChart: true,  // 默认不解析
      sequenceDiagram: true,  // 默认不解析
    });
    this.checkALink();
  }


  ngOnInit() {
    this.articleId = +this.routerinfo.snapshot.paramMap.get('id');
    this.responseComment = new CommentReq(true);
    this.getArticle();
    this.getPageComment();
    this.responseComment.articleID = this.articleId;
    this.copyRightUrl = location.href;
  }

  /**
   * 获取并处理文章
   */
  getArticle() {
    this.articleService.getArticleById(this.articleId).subscribe(data => {
      if (data.code === 0) {
        // 清空远先的markdown 内容
        document.getElementById('content').innerHTML = '';
        this.article = data.result;
        this.preview(data.result.mdContent);
        window.scrollTo(0, 0);
        this.titleService.setTitle(data.result.title);
        // 修改url栏的地址
        this.location.replaceState('article/' + data.result.id);
        this.copyRightUrl = location.href;
        this.loadOk = true;
      } else if (data.code === 201) {
        // 文章不存在
        this.router.navigateByUrl('404');
      }
    });
  }


  /**
   * 跳转id文章
   * @param id 文章id
   */
  toArticle(id: number) {
    if (id == null || id <= 0) {
      return;
    }
    this.articleId = id;
    this.loadOk = false;
    this.getArticle();
    this.getPageComment();
  }


  /**
   * 评论调到某一页
   * @param a 页码数
   */
  toPage(a: number) {
    if (a === this.pageNum) {
      return;
    }
    this.pageNum = a;
    this.getPageComment();
  }

  // 评论
  getPageComment() {
    this.commentService.getPageComment(this.articleId, this.pageNum, this.pageSize).subscribe(data => {
      if (data.code === 0) {
        this.loading = false;
        this.commentService.getResponseComment();
      }
    });
  }


  /**
   * 一级评论的创建
   */
  submitComment() {
    if (this.comment4submit == null || this.comment4submit === '') {
      this.message.info('内容不能为空');
      return;
    }
    const submitBody: CommentReq = new CommentReq(true);
    submitBody.content = this.comment4submit;
    submitBody.articleID = this.articleId;
    submitBody.pid = -1;

    this.commentService.submitComment(submitBody);
    this.comment4submit = null;

  }

  /**
   * 创建文本输入框的过程
   * @param id 父评论的id
   * @param name 富评论的作者名
   * @param index 索引 便于显示输入框
   */
  replyTo(id, name, index) {
    if (!this.userService.userInfo) {
      this.message.info('请先登录哟~~~');
      return;
    }
    this.responseComment.pid = id;
    this.responseComment.content = ' @' + name + ' ';
    this.relyIndex = index;
  }

  /**
   * 回复的数据提交
   */
  reply() {
    if (this.responseComment.content == null || this.responseComment.content === '') {
      this.message.info('内容不能为空');
      return;
    }
    if (this.responseComment.pid == null) {
      this.message.error('非法操作');
    }
    this.commentService.rely(this.responseComment).subscribe(data => {
      if (data.code === 0) {
        if (this.commentService.commentPage.list[this.relyIndex].child == null) {
          this.commentService.commentPage.list[this.relyIndex].child = [];
        }
        this.commentService.commentPage.list[this.relyIndex].child.unshift(data.result);
        this.responseComment.content = null;
      }
    });

  }

  // 曲线救国 重新设置a的href值
  checkALink() {
    const as = document.getElementsByTagName('a');
    let hrefStr: string = null ;
    let count: number = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < as.length; i++) {
      hrefStr = decodeURI(as[i].href);
      // console.log(as[i].getAttribute('level'));
      if (as[i].getAttribute('level') != null) {
        // 截取锚点名称
        const anchorName: string = hrefStr.substr(hrefStr.indexOf('#'), hrefStr.length);
        // 重新获取url 并拼接锚点名称
        as[i].href = location.origin + location.pathname + anchorName;
        count++;
      }
    }
    if (count === 0) {
        this.showToc = false;
    }
  }
}
