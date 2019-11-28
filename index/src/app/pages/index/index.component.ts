import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {TagService} from '../../services/tag/tag.service';
import {CountService} from '../../services/count/count.service';
import {ArticleService} from '../../services/article/article.service';
import {WebUpdateService} from '../../services/update/web-update.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public tagService: TagService,
              public countService: CountService,
              public articleService: ArticleService,
              public webUpdateService: WebUpdateService,
              private routerinfo: ActivatedRoute, private title: Title,
              private location: Location) {
    title.setTitle('小海博客');
  }

  public pageNum: number;
  public pageSize: number;

  imagePath: string;

  ngOnInit() {
    this.pageNum = this.routerinfo.snapshot.queryParams.page;
    this.pageSize = this.routerinfo.snapshot.queryParams.count;
    // 数据合法性验证
    this.pageNum = (this.pageNum == null || this.pageNum < 1) ? 1 : this.pageNum;
    this.pageSize = (this.pageSize == null || this.pageSize < 1) ? 5 : this.pageSize;
    // 获取数据

    if (this.tagService.tagCloudList == null) {
      this.tagService.getTagCloud();
    }
    if (this.countService.count == null) {
      this.countService.getCount();
    }
    this.articleService.getArticle(this.pageNum, this.pageSize);
    if (this.webUpdateService.updateInfoList == null) {
      this.webUpdateService.getUpdateInfo();
    }
    if (!this.webUpdateService.lastestUpdateTime) {
      this.webUpdateService.getLastestUpdateTime();
    }

    // 设置imagePath的初始值
    this.reset();
  }

  showQQImg() {
    this.imagePath = 'https://56462271.oss-cn-beijing.aliyuncs.com/web/qq.jpg';
  }

  showWxImg() {
    this.imagePath = 'https://56462271.oss-cn-beijing.aliyuncs.com/web/wx.jpg';
  }

  reset() {
    this.imagePath = 'https://56462271.oss-cn-beijing.aliyuncs.com/web/logo.png';
  }

  getPageArticle(e: number) {
    this.pageNum = e;
    // 修改地址栏
    this.location.replaceState('', '?page=' + e + '&count=' + this.pageSize);
    this.articleService.getArticle(this.pageNum, this.pageSize);
    window.scrollTo(0, 0);
  }
}
