import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {LinkService} from '../../services/link/link.service';
import {Link} from '../../classes/link';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.css']
})
export class LinksManagerComponent implements OnInit {

    constructor(public linkService: LinkService, private message: NzMessageService) {
    }

    pageNum: number = 1;
    pageSize: number = 10;

    showPupup = false;

    updateReqBody = new Link();

    isUpdate;

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.linkService.getLinks(this.pageNum, this.pageSize);
    }

    toPage(e: number) {
        this.pageNum = e;
        this.getData();
    }

    edit(link) {
        this.showPupup = true;
        this.updateReqBody = link;
        this.isUpdate = true;
    }

    update() {
        if (this.updateReqBody.name === '') {
            this.message.warning('友链名称不能为空');
            return;
        }
        if (this.updateReqBody.url === '') {
            this.message.warning('友链链接不能为空');
            return;
        }
        // @ts-ignore
        // tslint:disable-next-line:triple-equals
        if (this.updateReqBody.open == '') {
            this.message.warning('友链状态不能为空');
            return;
        }
        this.showPupup = false;
        if (this.isUpdate) {
            this.linkService.update(this.updateReqBody).subscribe(data => {
                if (data.code === 0) {
                    this.message.success('更新成功');
                    this.getData();
                } else {
                    this.message.error('更新失败，原因：' + data.msg);
                }
                this.updateReqBody.name = null;
                this.updateReqBody.url = null;
                this.updateReqBody.open = null;
            });
        } else {
            this.linkService.create(this.updateReqBody).subscribe(data => {
                if (data.code === 0) {
                    this.message.success('新增成功');
                    this.getData();
                } else {
                    this.message.error('新增失败，原因：' + data.msg);
                }
                this.updateReqBody.name = null;
                this.updateReqBody.url = null;
                this.updateReqBody.open = null;
            });
        }
    }

    add() {
        this.showPupup = true;
        this.isUpdate = false;
    }

    doDel(id) {
        this.linkService.delete(id).subscribe(data => {
            if (data.code === 0) {
                this.message.success('删除成功！');
                this.getData();
            } else {
                this.message.error('删除失败，原因：' + data.msg);
            }
        });
    }


}
