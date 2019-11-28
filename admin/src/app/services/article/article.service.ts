import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Page} from '../../classes/page';
import {Article} from '../../classes/article';
import {Observable, of} from 'rxjs';
import {exist} from '../../utils/dataUtil';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {


    constructor(public http: HttpService) {
    }

    // 存储所有已经请求过的数据<首页数据>
    pageList: Page<Article>[] = [];

    currentPage: Page<Article>;

    /**
     * 获取文章
     * @param pageNum 页码数
     * @param pageSize 单页数据量
     */
    getArticle(pageNum: number, pageSize: number): object {
        const articlePage = exist<Article>(pageNum, pageSize, this.pageList);
        if (articlePage) {
            articlePage.subscribe(data => {
                this.currentPage = data;
            });
            return articlePage;
        }
        const observable = this.http.get('/admin/articles?page=' + pageNum + '&count=' + pageSize);
        observable.subscribe(data => {
            if (data.code === 0) {
                this.currentPage = data.result;
                this.pageList.push(data.result);
            }
        });
        return observable;
    }

    deleteArticle(id) {
        return this.http.delete('/admin/article/del?articleID=' + id);
    }

}
