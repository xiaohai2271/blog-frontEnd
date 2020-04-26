import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Article} from '../class/Article';
import {HttpService} from './http/http.service';
import {PageList} from '../class/HttpReqAndResp';
import {ErrDispatch} from '../class/ErrDispatch';
import {ArticleReq} from '../class/Article';
import {Category, Tag} from '../class/Tag';
import {Comment} from '../class/Comment';
import {CommentReq} from '../class/Comment';
import {Link} from '../class/Link';
import {User} from '../class/User';
import {LoginReq} from '../class/User';

import {LocalStorageService} from '../services/local-storage.service';
import {Visitor} from '../class/Visitor';
import {UpdateInfo} from '../class/UpdateInfo';

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

    deleteArticle(id: number) {
        return super.Service<boolean>({
            path: '/admin/article/del',
            method: 'DELETE',
            queryParam: {articleID: id}
        })
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

    adminArticles(pageNumber: number = 1, pageSize: number = 10) {
        return super.Service<PageList<Article>>({
            path: '/admin/articles',
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

    createCategory(nameStr: string) {
        return super.Service<Category>({
            path: '/admin/category/create',
            method: 'POST',
            queryParam: {name: nameStr}
        });
    }

    deleteCategory(categoryId: number) {
        return super.Service<boolean>({
            path: '/admin/category/del',
            method: 'DELETE',
            queryParam: {id: categoryId}
        });
    }

    updateCategory(categoryId: number, nameStr: string) {
        return super.Service<Category>({
            path: '/admin/category/update',
            method: 'PUT',
            queryParam: {id: categoryId, name: nameStr}
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

    createTag(nameStr: string) {
        return super.Service<Tag>({
            path: '/admin/tag/create',
            method: 'POST',
            queryParam: {name: nameStr}
        });
    }

    deleteTag(TagId: number) {
        return super.Service<boolean>({
            path: '/admin/tag/del',
            method: 'DELETE',
            queryParam: {id: TagId}
        });
    }

    updateTag(TagId: number, nameStr: string) {
        return super.Service<Tag>({
            path: '/admin/tag/update',
            method: 'PUT',
            queryParam: {id: TagId, name: nameStr}
        });
    }


    getCommentByPid(pid: number, pageNumber: number = 1, pageSize: number = 10) {
        return super.Service<Comment[]>({
            path: `/comment/pid/${pid}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    getCommentByTypeForAdmin(isComment: boolean, pageNumber: number = 1, pageSize: number = 10) {
        return super.Service<PageList<Comment>>({
            path: `/admin/comment/type/${isComment ? 1 : 0}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    getCommentByTypeForUser(isComment: boolean, pageNumber: number = 1, pageSize: number = 10) {
        return super.Service<PageList<Comment>>({
            path: `/user/comment/type/${isComment ? 1 : 0}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    deleteComment(idNumer: number) {
        return super.Service<boolean>({
            path: `/user/comment/del`,
            method: 'DELETE',
            queryParam: {id: idNumer}
        });
    }

    updateComment(commentReq: CommentReq) {
        return super.Service<Comment>({
            path: `/user/comment/update`,
            method: 'PUT',
            data: commentReq,
            contentType: 'application/json'
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

    adminLinks(pageSize: number = 10, pageNumber: number = 1) {
        return super.Service<PageList<Link>>({
            path: '/admin/links',
            method: 'GET',
            queryParam: {
                count: pageSize,
                page: pageNumber
            }
        });
    }

    createLink(linkReq: Link) {
        return super.Service<Link>({
            path: '/admin/links/create',
            method: 'POST',
            data: linkReq,
            contentType: 'application/json'
        });
    }

    deleteLink(idNumber: number) {
        return super.Service<boolean>({
            path: `/admin/links/del/${idNumber}`,
            method: 'DELETE',
        });
    }

    updateLink(linkReq: Link) {
        return super.Service<Link>({
            path: '/admin/links/update',
            method: 'PUT',
            data: linkReq,
            contentType: 'application/json'
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

    adminUpdateUser(user: User) {
        return super.Service<User>({
            path: '/admin/user',
            method: 'PUT',
            data: user,
            contentType: 'application/json'
        })
    }

    deleteUser(id: number) {
        return super.Service<boolean>({
            path: `/admin/user/del/${id}`,
            method: 'DELETE',
        });
    }

    multipleDeleteUser(idArray: number[]) {
        return super.Service<{ id: number; msg: string; status: boolean }[]>({
            path: `/admin/user/delete`,
            method: 'DELETE',
            data: idArray,
            contentType: 'application/json'
        });
    }

    // 获取邮件是否已注册
    emailStatus(email: string) {
        return super.Service<boolean>({
            path: `/emailStatus/${email}`,
            method: 'GET'
        })
    }

    updateUserInfo(descStr: string, disPlayNameStr: string) {
        return super.Service<User>({
            path: '/user/userInfo/update',
            method: 'PUT',
            queryParam: {
                desc: descStr,
                displayName: disPlayNameStr
            }
        });
    }

    adminUsers(pageSize: number = 10, pageNumber: number = 1) {
        return super.Service<PageList<User>>({
            path: '/admin/users',
            method: 'GET',
            queryParam: {
                count: pageSize,
                page: pageNumber
            }
        });
    }

    visit() {
        return super.Service<Visitor>({
            path: '/visit',
            method: 'POST'
        });
    }

    adminVisitors(location: boolean = false, pageSize: number = 10, pageNumber: number = 1) {
        return super.Service<PageList<Visitor>>({
            path: '/admin/visitor/page',
            method: 'GET',
            queryParam: {
                count: pageSize,
                page: pageNumber,
                showLocation: location
            }
        });
    }

    dayVisitCount() {
        return super.Service<number>({
            path: '/dayVisitCount',
            method: 'GET',
        });
    }

    getLocalIp() {
        return super.Service<string>({
            path: '/ip',
            method: 'GET',
        });
    }

    getIpLocation(ip: string) {
        return super.Service<string>({
            path: `/ip/${ip}`,
            method: 'GET',
        });
    }

    visitorCount() {
        return super.Service<number>({
            path: `/visitor/count`,
            method: 'GET',
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

    createWebUpdateInfo(infoStr: string) {
        return super.Service<UpdateInfo>({
            path: '/admin/webUpdate/create',
            method: 'POST',
            queryParam: {info: infoStr}
        });
    }

    deleteWebUpdateInfo(idNumber: number) {
        return super.Service<boolean>({
            path: `/admin/webUpdate/del/${idNumber}`,
            method: 'DELETE',
        });
    }

    updateWebUpdateInfo(idNumber: number, infoStr: string) {
        return super.Service<UpdateInfo>({
            path: '/admin/webUpdate/update',
            method: 'PUT',
            queryParam: {id: idNumber, info: infoStr}
        });
    }

    bingPic() {
        return super.Service<string>({
            path: '/bingPic',
            method: 'GET'
        });
    }

}
