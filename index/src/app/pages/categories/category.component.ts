import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {CategoryService} from '../../services/category/category.service';
import {ArticleService} from '../../services/article/article.service';
import {Page} from '../../class/page';
import {Article} from '../../class/article';

@Component({
  selector: 'app-categories',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private routerinfo: ActivatedRoute,
              private titleService: Title,
              private location: Location,
              public categoryService: CategoryService,
              public articleService: ArticleService) {
    titleService.setTitle('小海博客|分类');
  }

  // 当前timeliness展示的分类
  public currentCategoryName: string;
  public currentArticleList: Page<Article>;

  ngOnInit() {
    this.currentCategoryName = this.routerinfo.snapshot.queryParams.name;
    if (this.categoryService.categories == null) {
      this.categoryService.getAllCategory().subscribe((data) => {
        // 有分类数据
        if (data.code === 0 && data.result.length > 0) {
          // 是否更具url的参数获取数据
          if (this.currentCategoryName == null) {
            this.currentCategoryName = data.result[0].name;
          }
          this.getArticle();
        }
      });
    } else if (this.currentCategoryName == null) {
      this.currentCategoryName = this.categoryService.categories[0].name;
    }
    this.getArticle();
  }


  /**
   * 切换 分类
   * @param name 分类名称
   */
  changeCategory(name: string) {
    if (this.currentCategoryName === name) {
      return;
    }
    this.currentCategoryName = name;
    this.getArticle();
    this.location.replaceState('category', '?name=' + name);
  }


  getArticle() {
    this.articleService.getArticleByCategory(this.currentCategoryName).subscribe(data => {
      if (data.code === 0) {
        this.currentArticleList = data.result;
      }
    });
  }

}
