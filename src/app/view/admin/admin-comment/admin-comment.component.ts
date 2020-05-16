import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../../../api/api.service';
import {PageList} from '../../../class/HttpReqAndResp';
import {Comment, CommentReq} from '../../../class/Comment';
import {GlobalUserService} from '../../../services/global-user.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-admin-comment',
    templateUrl: './admin-comment.component.html',
    styleUrls: ['./admin-comment.component.less']
})
export class AdminCommentComponent implements OnInit {

    constructor(private apiService: ApiService, private  messageService: NzMessageService, private userService: GlobalUserService,
                private title: Title) {
        this.title.setTitle('小海博客 | 评论管理')
        this.userService.watchUserInfo({
            next: data => {
                if (data.result) {
                    if (data.result.role === 'admin') {
                        this.getComment = this.getCommentForAdmin;
                    } else {
                        this.getComment = this.getCommentForUser;
                    }
                } else {
                    this.getComment = this.getCommentForUser;
                }
                this.getComment()
            },
            error: null,
            complete: null
        })
    }

    loading: boolean = true;
    pageIndex: number = 1;
    pageSize: number = 10;
    pageList: PageList<Comment> = new PageList<Comment>();
    editInfo = {
        id: null,
        content: new CommentReq(true),
        editFocus: false,
    }
    getComment: any;// 存放获取评论的方法


    ngOnInit(): void {
    }


    getCommentForAdmin = () => this.apiService.getCommentByTypeForAdmin(true, this.pageIndex, this.pageSize).subscribe({
        next: data => this.pageList = data.result,
        complete: () => this.loading = false,
        error: err => this.loading = false
    })

    getCommentForUser = () => this.apiService.getCommentByTypeForUser(true, this.pageIndex, this.pageSize).subscribe({
        next: data => this.pageList = data.result,
        complete: () => this.loading = false,
        error: err => this.loading = false
    })

    deleteComment(id: number) {
        this.loading = true;
        this.apiService.deleteComment(id).subscribe({
            next: () => {
                this.messageService.success('删除评论成功');
                this.getComment();
            },
            error: err => {
                this.loading = false;
                this.messageService.error(err.msg);
            },
            complete: () => this.loading = false
        })
    }

    edit() {
        this.editInfo.editFocus = false;
        this.loading = true;
        this.apiService.updateComment(this.editInfo.content).subscribe({
            next: data => {
                this.messageService.success('更新评论成功');
                this.getComment();
            },
            error: err => {
                this.loading = false;
                this.messageService.success(err.msg);
            },
            complete: () => this.loading = false
        })
    }

    editFocus(data: Comment) {
        this.editInfo.id = data.id;
        this.editInfo.content.content = data.content;
        this.editInfo.content.id = data.id;
        this.editInfo.content.articleID = data.articleID;
        this.editInfo.content.pid = data.pid;
        this.editInfo.content.responseId = data.responseId;
        this.editInfo.editFocus = true;
    }
}
