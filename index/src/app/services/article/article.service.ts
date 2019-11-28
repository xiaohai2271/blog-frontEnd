import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Page} from '../../class/page';
import {Article} from '../../class/article';
import {Observable} from 'rxjs';
import {Data} from '../../class/data';
import {ArticleReq} from '../../class/articleReq';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  constructor(public http: HttpService) {
  }

  // 存储所有已经请求过的数据<首页数据>
  pageList: Page<Article>[] = [];

  // 最后一次请求后的数据集<首页数据>
  currentPage: Page<Article>;

  // 通过分类获取的article
  public currentArticleOfCategory: Page<Article>;
  // 通过分类获取的article
  public currentArticleOfTag: Page<Article>;


  /**
   * 获取文章
   * @param pageNum 页码数
   * @param pageSize 单页数据量
   */
  getArticle(pageNum: number, pageSize: number): object {
    const articlePage = this.exist(pageNum, pageSize);
    if (articlePage) {
      return articlePage;
    }
    const observable = this.http.get('/articles?page=' + pageNum + '&count=' + pageSize);
    observable.subscribe((data: any) => {
      if (data.code === 0) {
        this.currentPage = data.result;
        this.pageList.push(data.result);
      }
    });
    return observable;
  }

  /**
   * 根据分类获取文章
   * @param name 分类名
   */
  getArticleByCategory(name: string) {
    return this.http.get('/articles/category/' + name);
  }

  /**
   * 根据标签获取文章
   * @param name 标签名
   */
  getArticleByTag(name: string) {
    return this.http.get('/articles/tag/' + name);
  }

  getArticleById(id: number, update: boolean = false) {
    return this.http.get('/article/articleID/' + id + '?update=' + update);
  }


  createArticle(article: ArticleReq) {
    return this.http.post('/admin/article/create', article, true);
  }

  updateArticle(article: ArticleReq) {
    return this.http.put('/admin/article/update', article);
  }

  /**
   * 判断并返回数据
   * @param pageNum 页码数
   * @param pageSize 单页数据量
   */
  private exist(pageNum: number, pageSize: number): Page<Article> {
    if (this.currentPage == null) {
      return null;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.pageList.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.pageList[i].pageNum == pageNum && this.pageList[i].pageSize == pageSize) {
        return this.pageList[i];
      }
    }
    return null;
  }
}
