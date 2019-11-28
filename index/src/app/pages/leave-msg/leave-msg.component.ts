import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NzMessageService} from 'ng-zorro-antd';
import {CommentService} from '../../services/comment/comment.service';
import {UserService} from '../../services/user/user.service';
import {CommentReq} from '../../class/commentReq';

@Component({
  selector: 'app-leave-msg',
  templateUrl: './leave-msg.component.html',
  styleUrls: ['./leave-msg.component.css']
})
export class LeaveMsgComponent implements OnInit {

  constructor(public leaveMsgService: CommentService,
              private message: NzMessageService,
              public userService: UserService,
              private titleService: Title) {
    titleService.setTitle('小海博客|留言');
    // todo ::: @ {pid} 的name
  }

  pageNum: number = 1;

  pageSize: number = 10;

  content: string = null;

  // 当前的回复框的所处位置
  relyIndex: number;

  public responseComment: CommentReq = new CommentReq(false);

  ngOnInit() {
    this.getPageLeaveMsg();
    window.scrollTo(0, 0);
  }

  getPageLeaveMsg() {
    this.leaveMsgService.getLeaveMsg(this.pageNum, this.pageSize);
  }

  /**
   * 点击回复 显示输入框 及准备数据
   * @param id 父级评论的id
   * @param name 父级评论者的name
   * @param index 索引
   */
  replyTo(id, name, index) {
    if (this.userService.userInfo == null) {
      this.message.info('请先登录哟~~~');
      return;
    }
    this.responseComment.pid = id;
    this.responseComment.content = ' @' + name + ' ';
    this.relyIndex = index;
  }


  toPage(a: number) {
    if (a === this.pageNum) {
      return;
    }
    this.pageNum = a;
    this.getPageLeaveMsg();
  }

  /**
   * 留言
   */
  submitComment() {
    if (this.content == null || this.content === '') {
      this.message.info('内容不能为空');
      return;
    }
    const submitBody: CommentReq = new CommentReq(false);
    submitBody.content = this.content;
    this.leaveMsgService.submitComment(submitBody);
  }


  /**
   * 回复的数据提交
   */
  reply() {
    if (this.responseComment.content == null || this.responseComment.content === '') {
      this.message.info('内容不能为空');
      return;
    }
    if (this.responseComment.pid == null) {
      this.message.error('非法操作');
    }
    this.responseComment.articleID = -1;
    this.leaveMsgService.rely(this.responseComment).subscribe(data => {
      if (data.code === 0) {
        if (this.leaveMsgService.leaveMsgPage.list[this.relyIndex].child == null) {
          this.leaveMsgService.leaveMsgPage.list[this.relyIndex].child = [];
        }
        this.leaveMsgService.leaveMsgPage.list[this.relyIndex].child.unshift(data.result);
        this.responseComment.content = null;
        this.responseComment.pid = null;
      }
    });
  }


}
