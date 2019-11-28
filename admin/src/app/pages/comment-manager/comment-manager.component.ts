import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {UserService} from '../../services/user/user.service';
import {CommentService} from '../../services/comment/comment.service';
import {Comment} from '../../classes/comment';
import {CommentReq} from '../../classes/commentReq';

@Component({
    selector: 'app-comment-manager',
    templateUrl: './comment-manager.component.html',
    styleUrls: ['./comment-manager.component.css']
})
export class CommentManagerComponent implements OnInit {

    constructor(public userService: UserService,
                public commentService: CommentService,
                private message: NzMessageService) {
    }

    pageNum: number = 1;
    pageSize: number = 10;

    commentType: number = 0;

    showPupup = false;

    updateReqBody = {
        id: null,
        type: null,
        content: null
    };
    showCommentDetail: boolean = false;
    commentDetail: Comment = new Comment();

    responseComment: CommentReq = new CommentReq(true);

    ngOnInit() {
        if (!this.userService.userInfo) {
            setTimeout(() => {
                this.doInquire();
            }, 500);
        } else {
            this.doInquire();
        }
    }

    doInquire() {
        const isAdmin: boolean = this.userService.userInfo.role === 'admin';
        if (this.commentType) {
            this.commentService.getComments(this.pageNum, this.pageSize, isAdmin);
        } else {
            this.commentService.getLeaveMsg(this.pageNum, this.pageSize, isAdmin);
        }
    }


    toPage(e: number) {
        this.pageNum = e;
        this.doInquire();
    }

    prepareComment(comment: Comment) {
        this.showCommentDetail = true;
        this.commentDetail = comment;
        this.commentService.getByPid(comment.id).subscribe(data => {
            if (data.code === 0) {
                this.commentDetail.child = data.result.list;
            }
        });
        // tslint:disable-next-line:triple-equals
        this.responseComment.comment = this.commentType == 1;
        // 若展示的是顶级评论 则pid为顶级评论的id 否则为该二级评论的pid
        this.responseComment.pid = this.commentDetail.pid === -1 ? this.commentDetail.id : this.commentDetail.pid;
        this.responseComment.articleID = this.commentDetail.articleID;
        console.log(`${this.commentType.valueOf() == 1} and type is ${this.commentType}`);
    }

    edit(type, id, content) {
        this.showPupup = true;
        this.updateReqBody.id = id;
        this.updateReqBody.type = type;
        this.updateReqBody.content = content;
    }

    update() {
        if (this.updateReqBody.content === '') {
            this.message.warning('不能为空');
            return;
        }
        this.showPupup = false;
        this.commentService.update(this.updateReqBody).subscribe(data => {
            if (data.code === 0) {
                this.message.success('修改成功！');
            }
        });
    }


    doDel(id) {
        this.commentService.delete(id).subscribe(data => {
            if (data.code === 0) {
                this.message.success('删除成功');
            } else {
                this.message.error('删除失败，原因：' + data.msg);
            }
        });
    }


    reply() {
        if (this.responseComment.content == null || this.responseComment.content === '') {
            this.message.info('内容不能为空');
            return;
        }
        this.responseComment.content = `@${this.commentDetail.authorName} ${this.responseComment.content}`
        this.commentService.rely(this.responseComment).subscribe(data => {
            if (data.code === 0) {
                this.commentDetail.child.push(data.result);
                this.message.success('回复成功');
                this.responseComment = new CommentReq(true);
                // tslint:disable-next-line:triple-equals
                if (this.commentType == 1) {
                    this.commentService.currentComment.list.push(data.result);
                } else {
                    this.commentService.currentLeaveMsg.list.push(data.result);
                }
            }
        });
    }
}
