import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {EditorConfig} from '../../class/editor-config';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NzMessageService} from 'ng-zorro-antd';
import {ArticleService} from '../../services/article/article.service';
import {CategoryService} from '../../services/category/category.service';
import {ArticleReq} from '../../class/articleReq';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  constructor(public articleService: ArticleService,
              private routerinfo: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private message: NzMessageService,
              public categoryService: CategoryService,
              public userService: UserService) {
    titleService.setTitle('小海博客|创作');
  }

  public obj: any;
  show = false;
  msg: any;
  conf = new EditorConfig();
  articleId;
  isUpdate = false;

  public article: ArticleReq = new ArticleReq();

  showPupup = false;

  // 同步属性内容
  syncModel(str): void {
    this.article.mdContent = str;
  }

  ngOnInit() {
    this.articleId = this.routerinfo.snapshot.queryParams.id;
    if (this.articleId != null) {
      this.isUpdate = true;
      this.getArticle();
    }
    if (!this.articleId && localStorage.getItem('tmpArticle')) {
      this.article = JSON.parse(localStorage.getItem('tmpArticle'));
    }
    this.setSuitableHeight();
    // 用户权限判断
    if (!this.userService.userInfo) {
      this.userService.getUserInfo().subscribe(data => {
        if (!data.result || data.result.role !== 'admin') {
          this.message.info('你暂时无发布文章的权限,所写文章将暂存在本地');
        }
      });
    } else {
      if (this.userService.userInfo.role !== 'admin') {
        this.message.info('你暂时无发布文章的权限,所写文章将暂存在本地');
      }
    }

  }

  /**
   * 设置高度
   */
  setSuitableHeight() {
    this.conf.height = (window.innerHeight - 80 - 50) + '';
  }

  // 提交按钮的事件
  articleSubmit() {
    if (this.article.title === '' || this.article.mdContent === '') {
      this.message.warning(this.article.title === '' ? '标题不能为空' : '文章不能为空');
      return;
    }
    this.showPupup = true;
    if (!this.categoryService.categories) {
      this.categoryService.getAllCategory();
    }
  }

  /**
   * 文章数据提交
   */
  publishArticle() {
    // 去除空值
    this.article.tags = this.article.tags.split(',').filter(item => item !== '').toString();
    if (this.article.tags === '') {
      this.message.warning('文章标签不能为空');
      return;
    }
    if (this.article.type !== (true || false)) {
      this.message.warning('文章类型不能为空');
      return;
    }
    if (this.article.category === '') {
      this.message.warning('文章分类不能为空');
      return;
    }
    if (!this.article.type) {
      const regExp = /^http(s|):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
      if (regExp.test(this.article.url)) {
        this.message.warning('原文链接不合法');
        return;
      }
    }

    // 文章 暂存
    localStorage.setItem('tmpArticle', JSON.stringify(this.article));

    this.article.url = this.article.type ? null : this.article.url;

    if (!this.isUpdate) {
      // 非文章更新
      this.articleService.createArticle(this.article).subscribe(data => {
        if (data.code === 0) {
          // TODO 成功
          this.message.success('发布成功,即将转跳');
          localStorage.removeItem('tmpArticle');

          setTimeout(() => {
            this.router.navigateByUrl('article/' + data.result.id);
          }, 2500);
        }
        if (data.code === 301) {
          // 未登陆
          this.router.navigateByUrl('login');
        }
        if (data.code === 302) {
          this.message.error('你没有发布文章的权限');
        }
      });

    } else {
      // 文章更新
      this.articleService.updateArticle(this.article).subscribe(data => {
        // TODO 未登陆
        if (data.code === 0) {
          this.message.success('更新成功，即将转跳');
          localStorage.removeItem('tmpArticle');
          setTimeout(() => {
            this.router.navigateByUrl('article/' + data.result.id);
          }, 2500);
        } else if (data.code === 301) {
          this.router.navigateByUrl('login');
        } else if (data.code === 302) {
          this.message.error('你没有更新文章的权限');
        } else {
          this.message.error('失败，原因：' + data.msg);
        }
      });
    }
  }

  /**
   * 获取文章 for  update
   */
  getArticle() {
    this.articleService.getArticleById(this.articleId, true).subscribe(data => {
      if (data.code === 0) {
        this.article.category = data.result.category;
        this.article.mdContent = data.result.mdContent;
        this.article.tags = String(data.result.tags);
        this.article.type = data.result.original;
        this.article.url = data.result.url;
        this.article.title = data.result.title;
        this.article.id = data.result.id;
      } else if (data.code === 201) {
        // 文章不存在
        this.message.error('文章不存在');
      }
    });
  }


}
