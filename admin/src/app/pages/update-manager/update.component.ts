import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {WebUpdateService} from '../../services/update/web-update.service';
import {UpdateInfo} from "../../classes/updateInfo";

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class UpdateManagerComponent implements OnInit {

    constructor(public updateService: WebUpdateService, private message: NzMessageService) {
    }

    isUpdate = false;

    pageNum: number = 1;
    pageSize: number = 10;

    showPupup = false;

    updateReqBody = new UpdateInfo();

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.updateService.getUpdateInfo(this.pageNum, this.pageSize);
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

    submit() {
        if (this.updateReqBody.info === '') {
            this.message.warning('更新内容不能为空');
            return;
        }

        this.showPupup = false;
        if (this.isUpdate) {
            this.updateService.update(this.updateReqBody).subscribe(data => {
                if (data.code === 0) {
                    this.message.success('更新成功');
                    this.getData();
                } else {
                    this.message.error('更新失败，原因：' + data.msg);
                }
            });
        } else {
            this.updateReqBody.id = null;
            this.updateService.create(this.updateReqBody.info).subscribe(data => {
                if (data.code === 0) {
                    this.message.success('新增成功');
                    this.getData();
                } else {
                    this.message.error('新增失败，原因：' + data.msg);
                }
            });
        }
        this.updateReqBody.id = null;
        this.updateReqBody.info = '';
    }

    add() {
        this.showPupup = true;
        this.isUpdate = false;
        this.updateReqBody.id = null;
        this.updateReqBody.info = '';
    }


    doDel(id: number) {
        this.updateService.delete(id).subscribe(data => {
            if (data.code === 0) {
                this.message.success('删除成功！');
                this.getData();
            } else {
                this.message.error('删除失败，原因：' + data.msg);
            }
        });
    }


}
