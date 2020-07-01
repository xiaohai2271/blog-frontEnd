import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../../../api/api.service';
import {RequestObj} from '../../../class/HttpReqAndResp';
import {Comment, CommentReq} from '../../../class/Comment';
import {GlobalUserService} from '../../../services/global-user.service';
import {Title} from '@angular/platform-browser';
import {Data} from '../components/common-table/data';

@Component({
    selector: 'app-admin-comment',
    templateUrl: './admin-comment.component.html',
})
export class AdminCommentComponent implements OnInit {

    constructor(private apiService: ApiService, private  messageService: NzMessageService, private userService: GlobalUserService,
                private title: Title) {
        this.title.setTitle('小海博客 | 评论管理')
        this.request = {
            // path: `/admin/comment/pagePath/${pagePath}`,
            path: null,
            method: 'GET',
            queryParam: {
                page: 1,
                count: 10
            }
        }
        this.userService.watchUserInfo({
            next: data => {
                if (data.result) {
                    if (data.result.role === 'admin') {
                        this.request.path = '/admin/comment/pagePath/*'
                    } else {
                        this.request.path = '/user/comment/pagePath/*'
                    }
                }
            },
            error: () => null,
            complete: () => null
        })
    }

    request: RequestObj;
    editInfo = {
        id: null,
        content: new CommentReq(null),
        editFocus: false,
    }
    headData: Data<Comment>[];

    ngOnInit(): void {
        this.headData = [
            {fieldName: '主键', fieldValue: 'id', show: false, primaryKey: true},
            {fieldName: '评论路径', fieldValue: 'pagePath', show: true},
            {fieldName: '评论创建者昵称', fieldValue: 'fromUser.displayName', show: true},
            {fieldName: '评论接收者昵称', fieldValue: 'toUser.displayName', show: true},
            {fieldName: '评论内容', fieldValue: 'content', show: false},
            {fieldName: '评论日期', fieldValue: 'date', show: true},
            {fieldName: '父评论id', fieldValue: 'pid', show: false},
            {fieldName: '状态', fieldValue: 'status', show: true},
            {
                fieldName: '操作',
                fieldValue: '',
                show: true,
                isActionColumns: true,
                action: [
                    {name: '查看', click: data => console.log(data)},
                    {name: '删除', color: 'red', click: data => this.deleteComment(data), needConfirm: true},
                    {name: '编辑', color: '#2db7f5', click: data => this.edit(data)},
                ]
            }
        ];
    }


    // // TODO:: pagePath
    // getCommentForAdmin = () => this.apiService.getCommentByTypeForAdmin('*', this.pageIndex, this.pageSize).subscribe({
    //     next: data => this.pageList = data.result,
    //     complete: () => this.loading = false,
    //     error: err => this.loading = false
    // })

    // getCommentForUser = () => this.apiService.getCommentByTypeForUser('*', this.pageIndex, this.pageSize).subscribe({
    //     next: data => this.pageList = data.result,
    //     complete: () => this.loading = false,
    //     error: err => this.loading = false
    // })

    deleteComment(data: Comment) {
        this.apiService.deleteComment(data.id).subscribe({
            next: () => {
                this.messageService.success('删除评论成功');
            },
            error: err => {
                this.messageService.error(err.msg);
            }
        })
    }

    edit(comment: Comment) {
        this.apiService.updateComment(this.editInfo.content).subscribe({
            next: data => {
                this.messageService.success('更新评论成功');
            },
            error: err => {
                this.messageService.success(err.msg);
            },
            complete: () => null
        })
    }

    editFocus(data: Comment) {
        this.editInfo.id = data.id;
        this.editInfo.content.content = data.content;
        this.editInfo.content.id = data.id;
        // this.editInfo.content.articleID = data.articleID;
        this.editInfo.content.pid = data.pid;
        // this.editInfo.content.responseId = data.responseId;
        this.editInfo.editFocus = true;
    }
}
