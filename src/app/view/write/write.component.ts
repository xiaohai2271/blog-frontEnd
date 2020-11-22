import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleReq} from '../../class/Article';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api/api.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {User} from '../../class/User';
import {Tag} from '../../class/Tag';
import {Title} from '@angular/platform-browser';
import {GlobalUserService} from '../../services/global-user.service';
import Vditor from 'vditor';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from '../../services/local-storage.service';
import {Response} from '../../class/HttpReqAndResp';

@Component({
    selector: 'view-write',
    templateUrl: './write.component.html',
    styleUrls: ['./write.component.less']
})
export class WriteComponent implements OnInit, OnDestroy {

    modalVisible: boolean = false;
    articleId: number;
    isUpdate = false;
    vditor: Vditor;
    public article: ArticleReq = new ArticleReq();
    userInfo: User;
    categoryList: Tag[];
    tagNacList: { name: string, size: number }[];
    primaryData = null;
    // 发布新文章时，文章相同会被拦回 此处判断一下
    title: string;
    private lastShowTime: number;
    private userInfoSub: { unsubscribe: () => void }

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private apiService: ApiService,
                private userService: GlobalUserService,
                private localStorageService: LocalStorageService,
                private message: NzMessageService,
                private titleService: Title) {
        this.titleService.setTitle('小海博客 | 创作');
    }

    ngOnInit(): void {
        this.vditor = new Vditor('vditor', this.initOption());
        // 用户权限判断
        this.userInfoSub = this.userService.watchUserInfo({
            complete: () => null,
            error: () => {
                if (!this.lastShowTime || Date.now() - this.lastShowTime > 1000) {
                    this.message.info('你暂时还没有登录，请点击右上角登录后开始创作');
                    this.lastShowTime = Date.now();
                }
            },
            next: data => {
                this.userInfo = data.result;
                if ((!data.result || data.result.role !== 'admin')
                    && (!this.lastShowTime || Date.now() - this.lastShowTime > 1000)) {
                    this.message.info('你暂时无发布文章的权限,所写文章将暂存在本地');
                }
            }
        })
        ;
        this.apiService.tagsNac().subscribe(data => {
            this.tagNacList = data.result;
            this.tagNacList.sort((a, b) => a.name.length - b.name.length);
        });
        this.apiService.categories().subscribe({
            next: data => {
                this.categoryList = data.result.list;
            },
            error: () => {
                this.message.error('获取分类信息失败');
            }
        });
    }

    ngOnDestroy(): void {
        this.userInfoSub.unsubscribe();
    }


    // 提交按钮的事件
    articleSubmit() {
        this.modalVisible = true;
        if (this.article.title === '' || this.article.mdContent === '') {
            this.message.warning(this.article.title === '' ? '标题不能为空' : '文章不能为空');
            return;
        }
        this.article.mdContent = this.vditor.getValue();
    }

    /**
     * 文章数据提交
     */
    publishArticle(e: { id: number; type: boolean; tags: string[]; category: string; isUpdate: boolean; url?: string }) {
        this.article.type = e.type;
        this.article.tags = e.tags;
        this.article.category = e.category;
        this.article.url = e.url;
        this.article.id = e.id;
        this.isUpdate = e.isUpdate

        this.modalVisible = false;

        // if (!this.article.id && this.title === this.article.title) {
        //     this.message.error('文章标题未经更改，请修改后再发布');
        //     return;
        // }


        this.article.url = this.article.type ? null : this.article.url;
        if (!this.isUpdate) {
            // 非文章更新

            this.apiService.createArticle(this.article).subscribe({
                next: data => {
                    // TODO 成功
                    this.message.success('发布成功,即将转跳');
                    localStorage.removeItem('tmpArticle');

                    setTimeout(() => {
                        this.router.navigateByUrl('article/' + data.result.id);
                    }, 2500);
                },
                error: err => {
                    if (err.code === 3010) {
                        // 未登陆
                        this.router.navigateByUrl('/user/login');
                    }
                    if (err.code === 3020) {
                        this.message.error('你没有发布文章的权限,文章替你暂存在本地');
                    }
                    this.message.error(err.msg);
                }
            });

        } else {
            // 文章更新

            this.apiService.updateArticle(this.article).subscribe({
                next: data => {
                    this.message.success('更新成功，即将转跳');
                    localStorage.removeItem('tmpArticle');
                    setTimeout(() => {
                        this.router.navigateByUrl('article/' + data.result.id);
                    }, 2500);
                },
                error: err => {
                    if (err.code === 3010) {
                        this.router.navigateByUrl('login');
                    } else if (err.code === 3020) {
                        this.message.error('你没有更新文章的权限');
                    } else {
                        this.message.error('失败，原因：' + err.msg);
                    }
                }
            });
        }
    }

    /**
     * 获取文章 for  update
     */
    getArticle() {
        this.apiService.getArticle(this.articleId, true).subscribe({
            next: data => {
                this.article.category = data.result.category;
                this.article.mdContent = data.result.mdContent;
                const tags = []
                data.result.tags.forEach(t => tags.push(t.name))
                this.article.tags = tags;
                this.article.type = data.result.original;
                this.article.url = data.result.url;
                this.article.title = data.result.title;
                this.article.id = data.result.id;
                this.title = data.result.title;
                this.primaryData = {
                    type: this.article.type,
                    tags: this.article.tags,
                    category: this.article.category,
                    url: this.article.url,
                    id: this.article.id
                };
                this.vditor.setValue(this.article.mdContent)
            },
            error: e => {
                if (e.code === 2010) {
                    // 文章不存在
                    this.message.error('文章不存在');
                }
            }
        });
    }

    private initOption(): IOptions {
        return {
            width: '100%',
            height: (window.innerHeight - 120),
            placeholder: '欢迎来到小海的创作中心',
            mode: 'sv',
            outline: true,
            toolbarConfig: {
                pin: true,
            },
            preview: {
                hljs: {
                    lineNumber: true
                },
                markdown: {
                    autoSpace: true,
                    fixTermTypo: true,
                    chinesePunct: true,
                    toc: false,
                    linkBase: ''
                }

            },
            cache: {
                enable: false,
            },
            counter: {
                enable: true
            },
            upload: {
                url: environment.host + '/fileUpload',
                format: (files: File[], responseText: string) => {
                    const data: Response<[{ originalFilename: string, host: string, path: string, success: boolean }]>
                        = JSON.parse(responseText);
                    const result = {
                        msg: data.msg,
                        code: data.code,
                        data: {
                            errFiles: [],
                            succMap: {}
                        }
                    }
                    data.result.filter(value => value.success)
                        .forEach(value => result.data.succMap[value.originalFilename] = value.host + value.path);
                    data.result.filter(value => !value.success)
                        .forEach(value => result.data.errFiles.push(value.originalFilename));
                    return JSON.stringify(result);
                },
                setHeaders: () => {
                    return {Authorization: this.localStorageService.getToken()}
                }
            },
            after: () => {
                // 判断是更新文章还是恢复文章
                this.articleId = this.activatedRoute.snapshot.queryParams.id;
                if (this.articleId != null) {
                    this.isUpdate = true;
                    this.getArticle();
                }
                if (!this.articleId && localStorage.getItem('tmpArticle')) {
                    this.article = JSON.parse(localStorage.getItem('tmpArticle'));
                }
            }
        }
    }
}
