import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {TagService} from '../../services/tag/tag.service';
import {ArticleService} from '../../services/article/article.service';
import {Page} from '../../class/page';
import {Article} from '../../class/article';

@Component({
  selector: 'app-tags',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})

export class TagComponent implements OnInit {

  constructor(private titleService: Title,
              public tagService: TagService,
              public articleService: ArticleService,
              private router: Router,
              private routerinfo: ActivatedRoute,
              private location: Location) {
    titleService.setTitle('小海博客|标签');
  }

  public currentTagName: string;
  public curremtArticlePage: Page<Article>;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.currentTagName = this.routerinfo.snapshot.queryParams.name;

    if (this.tagService.tagCloudList == null) {
      this.tagService.getTagCloud().subscribe((data: any) => {
        if (data.code === 0) {
          // 根据当前获取到的tag name获取数据
          if (this.currentTagName == null) {
            this.currentTagName = data.result[0].name;
          }
          this.getArticle();
        }
      });
    } else if (this.currentTagName == null) {
      this.currentTagName = this.tagService.tagCloudList[0].name;
    }
    this.getArticle();
  }


  changeTag(name) {
    this.currentTagName = name;
    this.location.replaceState('tag', '?name=' + name);
    this.getArticle();
  }

  getArticle() {
    this.articleService.getArticleByTag(this.currentTagName).subscribe(data => {
      this.curremtArticlePage = data.result;
    });
  }
}
