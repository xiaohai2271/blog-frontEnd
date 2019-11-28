import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Page} from '../../classes/page';
import {Comment} from '../../classes/comment';
import {exist} from '../../utils/dataUtil';
import {CommentReq} from "../../classes/commentReq";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(public http: HttpService) {
    }

    // 存放
    leaveMsgPage: Page<Comment>[] = [];

    commentPage: Page<Comment>[] = [];

    currentComment: Page<Comment>;

    currentLeaveMsg: Page<Comment>;

    /**
     * 获取 评论
     * @param pageNum 页码
     * @param pageSize 单页数据数量
     * @param isAdmin 是否是管理员
     */
    getComments(pageNum: number, pageSize: number, isAdmin: boolean) {
        const exist1 = exist<Comment>(pageNum, pageSize, this.commentPage);
        if (exist1) {
            exist1.subscribe(data => {
                this.currentComment = data;
            });
            return exist1;
        }
        const observable = this.http.get(`/${isAdmin ? 'admin' : 'user'}/comment/type/1?count=${pageSize}&page=${pageNum}`);
        observable.subscribe(data => {
            if (data.code === 0) {
                this.commentPage.unshift(data.result);
                this.currentComment = data.result;
            }
        });
        return observable;
    }

    /**
     * 获取 留言
     * @param pageNum 页码
     * @param pageSize 单页数据数量
     * @param isAdmin 是否是管理员
     */
    getLeaveMsg(pageNum: number, pageSize: number, isAdmin: boolean) {
        const exist1 = exist<Comment>(pageNum, pageSize, this.leaveMsgPage);
        if (exist1) {
            exist1.subscribe(data => {
                this.currentLeaveMsg = data;
            });
            return exist1;
        }
        const observable = this.http.get(`/${isAdmin ? 'admin' : 'user'}/comment/type/0?count=${pageSize}&page=${pageNum}`);
        observable.subscribe(data => {
            if (data.code === 0) {
                this.leaveMsgPage.unshift(data.result);
                this.currentLeaveMsg = data.result;
            }
        });
        return observable;
    }

    /**
     * 回复评论/留言
     * @param responseComment 请求体
     */
    rely(responseComment: CommentReq) {
        return this.http.post('/user/comment/create', responseComment, true);
    }

    /**
     * 通过父评论 获取回复
     * @param pid 父评论id
     */
    getByPid(pid: number) {
        return this.http.get('/comment/pid/' + pid + '?count=5&page=1');
    }

    update(subComment) {
        return this.http.put('/user/comment/update', subComment);
    }

    delete(id: number) {
        return this.http.delete('/user/comment/del?id=' + id);
    }


}
