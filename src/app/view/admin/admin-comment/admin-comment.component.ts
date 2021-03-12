import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ApiService} from '../../../api/api.service';
import {RequestObj} from '../../../class/HttpReqAndResp';
import {Comment, CommentReq} from '../../../class/Comment';
import {GlobalUserService} from '../../../services/global-user.service';
import {Title} from '@angular/platform-browser';
import {Data} from '../components/common-table/data';
import {EditableTagComponent} from '../components/editable-tag/editable-tag.component';
import {CommonTableComponent} from '../components/common-table/common-table.component';

@Component({
    selector: 'app-admin-comment',
    templateUrl: './admin-comment.component.html',
})
export class AdminCommentComponent implements OnInit {

    request: RequestObj;
    editInfo = {
        id: null,
        content: new CommentReq(null),
    };
    headData: Data<Comment>[];
    modalData = {
        visible: false,
        comment: null
    };
    @ViewChild('editableTagComponent') editableTagComponent: EditableTagComponent;
    @ViewChild('commonTableComponent') commonTableComponent: CommonTableComponent<Comment>;

    constructor(private apiService: ApiService, private  messageService: NzMessageService, private userService: GlobalUserService,
                private title: Title) {
        this.title.setTitle('小海博客 | 评论管理');
        this.userService.watchUserInfo({
            next: data => {
                let pathStr;
                if (data.result) {
                    if (data.result.role === 'admin') {
                        pathStr = '/admin/comment/pagePath/*';
                    } else {
                        pathStr = '/user/comment/pagePath/*';
                    }
                    this.request = {
                        path: pathStr,
                        method: 'GET',
                        queryParam: {
                            page: 1,
                            count: 10
                        }
                    };
                }
            },
            error: () => null,
            complete: () => null
        });
    }

    ngOnInit(): void {
        this.headData = [
            {title: '主键', fieldValue: 'id', show: false, primaryKey: true},
            {title: '评论路径', fieldValue: 'pagePath', show: true},
            {title: '评论创建者昵称', fieldValue: 'fromUser.displayName', show: true},
            {title: '评论内容', fieldValue: 'content', show: true},
            {title: '评论接收者昵称', fieldValue: 'toUser.displayName', show: true},
            {title: '评论日期', fieldValue: 'date', show: true},
            {title: '父评论id', fieldValue: 'pid', show: false},
            {title: '状态', fieldValue: 'status', show: true},
            {
                title: '操作',
                fieldValue: '',
                show: true,
                isActionColumns: true,
                action: [
                    {
                        name: '查看',
                        click: data => {
                            this.modalData.visible = true;
                            this.modalData.comment = data;
                        }
                    },
                    {name: '删除', color: 'red', click: data => this.deleteComment(data), needConfirm: true},
                    {name: '编辑', color: '#2db7f5', click: data => this.editableTagComponent.getFocus(data.id)},
                ]
            }
        ];
    }

    deleteComment(data: Comment) {
        if (data.status === 3) {
            this.messageService.error('该数据已被删除');
            return;
        }
        this.apiService.deleteComment(data.id).subscribe({
            next: () => this.messageService.success('删除评论成功'),
            error: err => this.messageService.error(err.msg),
            complete: () => this.commonTableComponent.getData()
        });
    }

    edit() {
        this.apiService.updateComment(this.editInfo.content).subscribe({
            next: data => {
                this.messageService.success('更新评论成功');
            },
            error: err => {
                this.messageService.success(err.msg);
            },
            complete: () => null
        });
    }

    textChange(value: { value: string; originalValue: string; changed: boolean }, data: Comment) {
        if (value.changed) {
            this.editInfo.id = data.id;
            this.editInfo.content.pid = data.pid;
            this.editInfo.content.id = data.id;
            this.editInfo.content.content = value.value;
            this.edit();
        }
    }
}
