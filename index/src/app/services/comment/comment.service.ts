import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Page} from '../../class/page';
import {LeaveMsg} from '../../class/LeaveMsg';
import {CommentReq} from '../../class/commentReq';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(public http: HttpService) {
  }

  // 存放
  leaveMsgPage: Page<LeaveMsg> = new Page();

  commentPage: Page<LeaveMsg> = new Page();


  /**
   * 获取留言
   * @param pageNum 页码
   * @param pageSize 单页数据数量
   */
  getLeaveMsg(pageNum: number, pageSize: number) {
    const observable = this.http.get('/leaveMsg?count=' + pageSize + '&page=' + pageNum);
    observable.subscribe(data => {
      if (data.code === 0) {
        this.leaveMsgPage = data.result;
        this.getResponseLeaveMsg();
      }
    });
    return observable;
  }

  /**
   * 获取文章的评论
   * @param articleId 文章id
   * @param pageNum 页码
   * @param pageSize 单页数量
   */
  getPageComment(articleId: number, pageNum: number, pageSize: number) {
    const observable = this.http.get('/comments?articleId=' + articleId + '&count=' + pageSize + '&page=' + pageNum);
    observable.subscribe(data => {
      if (data.code === 0) {
        this.commentPage = data.result;
        this.getResponseComment();
      }
    });
    return observable;
  }


  /**
   * 获取留言的回复
   */
  getResponseLeaveMsg() {
    if (!this.leaveMsgPage.list) {
      return;
    }
    this.leaveMsgPage.list.forEach(leaveMsg => {
      if (leaveMsg.responseId != null && leaveMsg.responseId !== '') {
        this.getByPid(leaveMsg.id).subscribe(data => {
          if (data.code === 0) {
            leaveMsg.child = data.result.list;
          }
        });
      }
    });
  }

  /**
   * 获取评论的回复
   */
  getResponseComment() {
    if (!this.commentPage.list) {
      return;
    }
    this.commentPage.list.forEach(comment => {
      if (comment.responseId != null && comment.responseId !== '') {
        this.getByPid(comment.id).subscribe(data => {
          if (data.code === 0) {
            comment.child = data.result.list;
          }
        });
      }
    });
  }


  /**
   * 通过父评论 获取回复
   * @param pid 父评论id
   */
  getByPid(pid: number) {
    return this.http.get('/comment/pid/' + pid + '?count=5&page=1');
  }

  /**
   * 提交评论/留言 并加入缓存数据中
   * @param submitBody 请求体
   */
  submitComment(submitBody: CommentReq) {
    this.http.post('/user/comment/create', submitBody, true).subscribe(data => {
      if (data.code === 0) {
        if (!submitBody.comment) {
          this.leaveMsgPage.list.unshift(data.result);
        } else {
          this.commentPage.list.unshift(data.result);
        }
      }
    });
  }


  /**
   * 回复评论/留言
   * @param responseComment 请求体
   */
  rely(responseComment: CommentReq) {
    return this.http.post('/user/comment/create', responseComment, true);
  }
}
