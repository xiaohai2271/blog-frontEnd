import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Article} from '../class/Article';
import {HttpService} from './http/http.service';
import {PageList} from '../class/HttpReqAndResp';
import {ErrDispatch} from '../class/ErrDispatch';
import {ArticleReq} from '../class/Article';
import {Tag} from '../class/Tag';
import {Comment} from '../class/Comment';
import {CommentReq} from '../class/Comment';
import {Link} from '../class/Link';
import {User} from '../class/User';
import {LoginReq} from '../class/User';

import {LocalStorageService} from '../services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService extends HttpService {

    constructor(httpClient: HttpClient,
                localStorageService: LocalStorageService) {
        super(httpClient, localStorageService);
    }

    setErrDispatch(errDispatch: ErrDispatch) {
        super.setErrDispatch(errDispatch);
    }

    createArticle(article: ArticleReq) {
        article.id = null;
        return super.Service<Article>({
            path: '/admin/article/create',
            contentType: 'application/json',
            method: 'POST',
            data: article
        });
    }

    articles(pageNumber: number = 1, pageSize: number = 5) {
        return super.Service<PageList<Article>>({
            path: '/articles',
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    updateArticle(article: ArticleReq) {
        return super.Service<Article>({
            path: '/admin/article/update',
            method: 'PUT',
            contentType: 'application/json',
            data: article
        });
    }

    getArticle(articleId: number, is4Update: boolean = false) {
        return super.Service<Article>({
            path: `/article/articleID/${articleId}`,
            method: 'GET',
            queryParam: {update: is4Update},
        });
    }

    articlesByCategory(category: string, pageNumber: number = 1, pageSize: number = 10) {
        return super.Service<PageList<Article>>({
            path: `/articles/category/${category}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    articlesByTag(tag: string, pageNumber: number = 1, pageSize: number = 10) {
        return super.Service<PageList<Article>>({
            path: `/articles/tag/${tag}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    categories() {
        return super.Service<Tag[]>({
            path: '/categories',
            method: 'GET'
        });
    }

    tags(pageNumber: number = 1, pageSize: number = 10) {
        return super.Service<Tag[]>({
            path: '/tags',
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    tagsNac() {
        return super.Service<{ name: string, size: number }[]>({
            path: '/tags/nac',
            method: 'GET'
        });
    }

    getCommentByPid(pid: number, pageNumber: number = 1, pageSize: number = 10) {
        return super.Service<PageList<Comment>[]>({
            path: `/comment/pid/${pid}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    comments(articleID: number, pageSize: number = 10, pageNumber: number = 1) {
        return super.Service<PageList<Comment>>({
            path: '/comments',
            method: 'GET',
            queryParam: {
                articleId: articleID,
                count: pageSize,
                page: pageNumber
            }
        });
    }

    leaveMsg(pageSize: number = 10, pageNumber: number = 1) {
        return super.Service<PageList<Comment>>({
            path: '/leaveMsg',
            method: 'GET',
            queryParam: {
                count: pageSize,
                page: pageNumber
            }
        });
    }

    createComment(commentReq: CommentReq) {
        return super.Service<Comment>({
            path: '/user/comment/create',
            method: 'POST',
            contentType: 'application/json',
            data: commentReq
        });
    }


    counts() {
        return super.Service<{
            articleCount: number,
            visitorCount: number,
            categoryCount: number,
            leaveMsgCount: number,
            tagCount: number,
            commentCount: number
        }>({
            path: '/counts',
            method: 'GET'
        });
    }

    applyLink(link: Link) {
        return super.Service<string>({
            path: '/apply',
            method: 'POST',
            queryParam: {
                name: link.name,
                url: link.url
            }
        });
    }

    links() {
        return super.Service<Link[]>({
            path: '/links',
            method: 'GET',
        });
    }

    verifyImgCode(codeStr: string) {
        return super.Service<string>({
            path: '/verCode',
            method: 'POST',
            queryParam: {code: codeStr}
        });
    }


    login(loginReq: LoginReq) {
        return super.Service<User>({
            path: '/login',
            method: 'POST',
            contentType: 'application/json',
            data: loginReq
        });
    }

    logout() {
        return super.Service<string>({
            path: '/logout',
            method: 'GET',
        });
    }

    registration(emailStr: string, pwd: string) {
        return super.Service<boolean>({
            path: '/registration',
            method: 'POST',
            queryParam: {
                email: emailStr,
                password: pwd
            }
        });
    }

    resetPwd(idStr: string, emailStr: string, pwdStr: string) {
        return super.Service<string>({
            path: '/resetPwd',
            method: 'POST',
            queryParam: {
                verifyId: idStr,
                email: emailStr,
                pwd: pwdStr
            }
        });
    }

    emailVerify(idStr: string, emailStr: string) {
        return super.Service<void>({
            path: '/emailVerify',
            method: 'POST',
            queryParam: {
                verifyId: idStr,
                email: emailStr
            }
        });
    }


    sendResetPwdEmail(emailStr: string) {
        return super.Service<string>({
            path: '/sendResetPwdEmail',
            method: 'POST',
            queryParam: {email: emailStr}
        });
    }

    sendVerifyEmail(emailStr: string) {
        return super.Service<string>({
            path: '/sendVerifyEmail',
            method: 'POST',
            queryParam: {email: emailStr}
        });
    }

    userInfo() {
        return super.Service<User>({
            path: '/user/userInfo',
            method: 'GET',
        });
    }

    visit() {
        return super.Service<User>({
            path: '/visit',
            method: 'POST',
        });
    }

    webUpdate() {
        return super.Service<{ id: number, info: string, time: string }[]>({
            path: '/webUpdate',
            method: 'GET'
        });
    }

    lastestUpdate() {
        return super.Service<{
            lastUpdateTime: string;
            lastUpdateInfo: string;
            lastCommit: string;
            committerAuthor: string;
            committerDate: string;
            commitUrl: string
        }>({
            path: '/lastestUpdate',
            method: 'GET'
        });
    }

    bingPic() {
        return super.Service<string>({
            path: '/bingPic',
            method: 'GET'
        });
    }

}
