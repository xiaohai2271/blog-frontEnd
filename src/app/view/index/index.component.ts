import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api/api.service';
import {Article} from '../../class/Article';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import {SvgIconUtil} from '../../utils/svgIconUtil';
import {PageList, RequestObj} from '../../class/HttpReqAndResp';
import {Router} from '@angular/router';
import {Category} from '../../class/Tag';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'view-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less'],
    providers: [ApiService]
})
export class IndexComponent implements OnInit {

    constructor(private apiService: ApiService,
                private iconService: NzIconService,
                private nzMessageService: NzMessageService,
                private router: Router,
                private title: Title) {
        this.iconService.addIconLiteral('blog:location', SvgIconUtil.locationIcon);
        title.setTitle('小海博客');
    }

    readonly logoImgUrl: string = 'https://56462271.oss-cn-beijing.aliyuncs.com/web/logo.png';
    readonly qqQrImgUrl: string = 'https://56462271.oss-cn-beijing.aliyuncs.com/web/qq.jpg';
    readonly wxQrImgUrl: string = 'https://56462271.oss-cn-beijing.aliyuncs.com/web/wx.jpg';

    imgUrl: string;
    desc: string;
    articles: PageList<Article>;
    tagNameAndNumber: { name: string, size: number }[];
    categoryList: Category[];
    counts: {
        articleCount: number,
        visitorCount: number,
        categoryCount: number,
        tagCount: number,
        commentCount: number
    };
    lastestUpdate: {
        lastUpdateTime: string;
        lastUpdateInfo: string;
        lastCommit: string;
        committerAuthor: string;
        committerDate: string;
        commitUrl: string
    };

    ngOnInit() {
        this.imgUrl = this.logoImgUrl;
        this.desc = '一个爱好瞎捣鼓的技术宅 :)\n欢迎一起来探讨学习。';

        this.getArticles(1);
        this.apiService.tagsNac().subscribe({
            next: data => this.tagNameAndNumber = data.result,
            error: error => {
            }
        });
        this.apiService.counts().subscribe({
            next: data => this.counts = data.result,
            error: error => {
            }
        });
        this.apiService.lastestUpdate().subscribe({
            next: data => this.lastestUpdate = data.result,
            error: error => {
            }
        });
        this.apiService.categories().subscribe({
            next: data => this.categoryList = data.result.list,
            error: err => {
            }
        });
        this.apiService.visit().subscribe(data => {
        });

    }


    changeImg(url: string = this.logoImgUrl) {
        this.imgUrl = url;
    }

    getArticles(pageNumber: number) {
        this.apiService.articles(pageNumber, 10)
            .subscribe({
                next: data => this.articles = data.result,
                error: error => {
                }
            });
    }

    errHandler(code: number, msg: string, request?: RequestObj) {
        this.nzMessageService.error(msg);
    }

    toTag(name: string) {
        this.router.navigateByUrl('tags/' + encodeURI(name));
    }

    toCategory(name: string) {
        this.router.navigateByUrl('categories/' + encodeURI(name));
    }
}
