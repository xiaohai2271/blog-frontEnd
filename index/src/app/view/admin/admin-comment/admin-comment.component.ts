import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../../../api/api.service';
import {PageList} from '../../../class/HttpReqAndResp';
import {Comment, CommentReq} from '../../../class/Comment';

@Component({
    selector: 'app-admin-comment',
    templateUrl: './admin-comment.component.html',
    styleUrls: ['./admin-comment.component.less']
})
export class AdminCommentComponent implements OnInit {

    constructor(private apiService: ApiService, private  messageService: NzMessageService) {
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

    ngOnInit(): void {
        this.getComment();
    }

    getComment = () => this.apiService.getCommentByTypeForAdmin(true, this.pageIndex, this.pageSize).subscribe({
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
