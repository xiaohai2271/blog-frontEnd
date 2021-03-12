import {Injectable} from '@angular/core';
import {Article, ArticleReq} from '../class/Article';
import {HttpService} from './http/http.service';
import {PageList} from '../class/HttpReqAndResp';
import {Category, Tag} from '../class/Tag';
import {Comment, CommentReq} from '../class/Comment';
import {ApplyLinkReq, Link} from '../class/Link';
import {LoginReq, User} from '../class/User';
import {Visitor} from '../class/Visitor';
import {UpdateInfo} from '../class/UpdateInfo';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    constructor(private httpService: HttpService) {
    }

    createArticle(article: ArticleReq) {
        article.id = null;
        return this.httpService.Service<Article>({
            path: '/admin/article/create',
            contentType: 'application/json',
            method: 'POST',
            data: article
        });
    }

    deleteArticle(id: number) {
        return this.httpService.Service<boolean>({
            path: '/admin/article/del',
            method: 'DELETE',
            queryParam: {articleID: id}
        });
    }

    articles(pageNumber: number = 1, pageSize: number = 5) {
        return this.httpService.Service<PageList<Article>>({
            path: '/articles',
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    adminArticles(pageNumber: number = 1, pageSize: number = 10) {
        return this.httpService.Service<PageList<Article>>({
            path: '/admin/articles',
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    updateArticle(article: ArticleReq) {
        return this.httpService.Service<Article>({
            path: '/admin/article/update',
            method: 'PUT',
            contentType: 'application/json',
            data: article
        });
    }

    getArticle(articleId: number, is4Update: boolean = false) {
        return this.httpService.Service<Article>({
            path: `/article/articleID/${articleId}`,
            method: 'GET',
            queryParam: {update: is4Update},
        });
    }

    articlesByCategory(category: string, pageNumber: number = 1, pageSize: number = 10) {
        return this.httpService.Service<PageList<Article>>({
            path: `/articles/category/${category}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    articlesByTag(tag: string, pageNumber: number = 1, pageSize: number = 10) {
        return this.httpService.Service<PageList<Article>>({
            path: `/articles/tag/${tag}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    categories() {
        return this.httpService.Service<PageList<Category>>({
            path: '/categories',
            method: 'GET'
        });
    }

    createCategory(nameStr: string) {
        return this.httpService.Service<Category>({
            path: '/admin/category/create',
            method: 'POST',
            queryParam: {name: nameStr}
        });
    }

    deleteCategory(categoryId: number) {
        return this.httpService.Service<boolean>({
            path: '/admin/category/del',
            method: 'DELETE',
            queryParam: {id: categoryId}
        });
    }

    updateCategory(categoryId: number, nameStr: string) {
        return this.httpService.Service<Category>({
            path: '/admin/category/update',
            method: 'PUT',
            queryParam: {id: categoryId, name: nameStr}
        });
    }

    tags(pageNumber: number = 1, pageSize: number = 10) {
        return this.httpService.Service<PageList<Tag>>({
            path: '/tags',
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    tagsNac() {
        return this.httpService.Service<{ name: string; size: number }[]>({
            path: '/tags/nac',
            method: 'GET'
        });
    }

    createTag(nameStr: string) {
        return this.httpService.Service<Tag>({
            path: '/admin/tag/create',
            method: 'POST',
            queryParam: {name: nameStr}
        });
    }

    deleteTag(TagId: number) {
        return this.httpService.Service<boolean>({
            path: '/admin/tag/del',
            method: 'DELETE',
            queryParam: {id: TagId}
        });
    }

    updateTag(TagId: number, nameStr: string) {
        return this.httpService.Service<Tag>({
            path: '/admin/tag/update',
            method: 'PUT',
            queryParam: {id: TagId, name: nameStr}
        });
    }

    getCommentByTypeForAdmin(pagePath: string, pageNumber: number = 1, pageSize: number = 10) {
        return this.httpService.Service<PageList<Comment>>({
            path: `/admin/comment/pagePath/${pagePath}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    getCommentByTypeForUser(pagePath: string, pageNumber: number = 1, pageSize: number = 10) {
        return this.httpService.Service<PageList<Comment>>({
            path: `/user/comment/pagePath/${pagePath}`,
            method: 'GET',
            queryParam: {
                page: pageNumber,
                count: pageSize
            }
        });
    }

    deleteComment(idNumer: number) {
        return this.httpService.Service<boolean>({
            path: `/user/comment/del`,
            method: 'DELETE',
            queryParam: {id: idNumer}
        });
    }

    updateComment(commentReq: CommentReq) {
        return this.httpService.Service<Comment>({
            path: `/user/comment/update`,
            method: 'PUT',
            data: commentReq,
            contentType: 'application/json'
        });
    }

    comments(pagePath: string, pageSize: number = 10, pageNumber: number = 1) {
        return this.httpService.Service<PageList<Comment>>({
            path: `/comment/pagePath/${pagePath}`,
            method: 'GET',
            queryParam: {
                count: pageSize,
                page: pageNumber
            }
        });
    }

    createComment(commentReq: CommentReq) {
        return this.httpService.Service<Comment>({
            path: '/user/comment/create',
            method: 'POST',
            contentType: 'application/json',
            data: commentReq
        });
    }


    counts() {
        return this.httpService.Service<{
            articleCount: number;
            visitorCount: number;
            categoryCount: number;
            tagCount: number;
            commentCount: number;
        }>({
            path: '/counts',
            method: 'GET'
        });
    }

    adminLinks(pageSize: number = 10, pageNumber: number = 1) {
        return this.httpService.Service<PageList<Link>>({
            path: '/admin/links',
            method: 'GET',
            queryParam: {
                count: pageSize,
                page: pageNumber
            }
        });
    }

    createLink(linkReq: Link) {
        return this.httpService.Service<Link>({
            path: '/admin/links/create',
            method: 'POST',
            data: linkReq,
            contentType: 'application/json'
        });
    }

    deleteLink(idNumber: number) {
        return this.httpService.Service<boolean>({
            path: `/admin/links/del/${idNumber}`,
            method: 'DELETE',
        });
    }

    updateLink(linkReq: Link) {
        return this.httpService.Service<Link>({
            path: '/admin/links/update',
            method: 'PUT',
            data: linkReq,
            contentType: 'application/json'
        });
    }

    applyLink(link: ApplyLinkReq) {
        return this.httpService.Service<string>({
            path: '/apply',
            method: 'POST',
            data: link,
            contentType: 'application/json'
        });
    }

    reapplyLink(keyStr: string) {
        return this.httpService.Service<string>({
            path: '/reapply',
            method: 'POST',
            queryParam: {
                key: keyStr
            }
        });
    }

    links() {
        return this.httpService.Service<Link[]>({
            path: '/links',
            method: 'GET',
        });
    }

    verifyImgCode(codeStr: string) {
        return this.httpService.Service<string>({
            path: '/verCode',
            method: 'POST',
            queryParam: {code: codeStr}
        });
    }


    login(loginReq: LoginReq) {
        return this.httpService.Service<User>({
            path: '/login',
            method: 'POST',
            contentType: 'application/json',
            data: loginReq
        });
    }

    logout() {
        return this.httpService.Service<string>({
            path: '/logout',
            method: 'GET',
        });
    }

    registration(emailStr: string, pwd: string) {
        return this.httpService.Service<boolean>({
            path: '/registration',
            method: 'POST',
            queryParam: {
                email: emailStr,
                password: pwd
            }
        });
    }

    resetPwd(idStr: string, emailStr: string, pwdStr: string) {
        return this.httpService.Service<string>({
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
        return this.httpService.Service<void>({
            path: '/emailVerify',
            method: 'POST',
            queryParam: {
                verifyId: idStr,
                email: emailStr
            }
        });
    }


    sendResetPwdEmail(emailStr: string) {
        return this.httpService.Service<string>({
            path: '/sendResetPwdEmail',
            method: 'POST',
            queryParam: {email: emailStr}
        });
    }

    sendVerifyEmail(emailStr: string) {
        return this.httpService.Service<string>({
            path: '/sendVerifyEmail',
            method: 'POST',
            queryParam: {email: emailStr}
        });
    }

    userInfo() {
        return this.httpService.Service<User>({
            path: '/user/userInfo',
            method: 'GET',
        });
    }

    adminUpdateUser(user: User) {
        return this.httpService.Service<User>({
            path: '/admin/user',
            method: 'PUT',
            data: user,
            contentType: 'application/json'
        });
    }

    deleteUser(id: number) {
        return this.httpService.Service<boolean>({
            path: `/admin/user/delete/${id}`,
            method: 'DELETE',
        });
    }

    multipleDeleteUser(idArray: number[]) {
        return this.httpService.Service<{ id: number; msg: string; status: boolean }[]>({
            path: `/admin/user/delete`,
            method: 'DELETE',
            data: idArray,
            contentType: 'application/json'
        });
    }

    // 获取邮件是否已注册
    emailStatus(email: string) {
        return this.httpService.Service<boolean>({
            path: `/emailStatus/${email}`,
            method: 'GET'
        });
    }

    updateUserInfo(descStr: string, disPlayNameStr: string) {
        return this.httpService.Service<User>({
            path: '/user/userInfo/update',
            method: 'PUT',
            queryParam: {
                desc: descStr,
                displayName: disPlayNameStr
            }
        });
    }

    adminUsers(pageSize: number = 10, pageNumber: number = 1) {
        return this.httpService.Service<PageList<User>>({
            path: '/admin/users',
            method: 'GET',
            queryParam: {
                count: pageSize,
                page: pageNumber
            }
        });
    }

    visit() {
        return this.httpService.Service<Visitor>({
            path: '/visit',
            method: 'POST'
        });
    }

    adminVisitors(location: boolean = false, pageSize: number = 10, pageNumber: number = 1) {
        return this.httpService.Service<PageList<Visitor>>({
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
        return this.httpService.Service<number>({
            path: '/dayVisitCount',
            method: 'GET',
        });
    }

    getLocalIp() {
        return this.httpService.Service<string>({
            path: '/ip',
            method: 'GET',
        });
    }

    getIpLocation(ip: string) {
        return this.httpService.Service<string>({
            path: `/ip/${ip}`,
            method: 'GET',
        });
    }

    visitorCount() {
        return this.httpService.Service<number>({
            path: `/visitor/count`,
            method: 'GET',
        });
    }

    webUpdate() {
        return this.httpService.Service<{ id: number; info: string; time: string }[]>({
            path: '/webUpdate',
            method: 'GET'
        });
    }

    webUpdatePage(pageSize: number = 10, pageNumber: number = 1) {
        return this.httpService.Service<PageList<{ id: number; info: string; time: string }>>({
            path: '/webUpdate/pages',
            method: 'GET',
            queryParam: {
                count: pageSize,
                page: pageNumber,
            }
        });
    }

    lastestUpdate() {
        return this.httpService.Service<{
            lastUpdateTime: string;
            lastUpdateInfo: string;
            lastCommit: string;
            committerAuthor: string;
            committerDate: string;
            commitUrl: string;
        }>({
            path: '/lastestUpdate',
            method: 'GET'
        });
    }

    createWebUpdateInfo(infoStr: string) {
        return this.httpService.Service<UpdateInfo>({
            path: '/admin/webUpdate/create',
            method: 'POST',
            queryParam: {info: infoStr}
        });
    }

    deleteWebUpdateInfo(idNumber: number) {
        return this.httpService.Service<boolean>({
            path: `/admin/webUpdate/del/${idNumber}`,
            method: 'DELETE',
        });
    }

    updateWebUpdateInfo(idNumber: number, infoStr: string) {
        return this.httpService.Service<UpdateInfo>({
            path: '/admin/webUpdate/update',
            method: 'PUT',
            queryParam: {id: idNumber, info: infoStr}
        });
    }

    bingPic() {
        return this.httpService.Service<string>({
            path: '/bingPic',
            method: 'GET'
        });
    }

    setPwd(pwdStr: string, newPwdStr: string, confirmPwdStr: string,) {
        return this.httpService.Service<string>({
            path: '/user/setPwd',
            method: 'POST',
            queryParam: {
                pwd: pwdStr,
                newPwd: newPwdStr,
                confirmPwd: confirmPwdStr,
            }
        });
    }

}
