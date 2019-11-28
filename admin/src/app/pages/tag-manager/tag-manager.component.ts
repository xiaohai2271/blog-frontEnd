import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {TagService} from '../../services/tag/tag.service';

@Component({
    selector: 'app-tag-manager',
    templateUrl: './tag-manager.component.html',
    styleUrls: ['./tag-manager.component.css']
})
export class TagManagerComponent implements OnInit {

    constructor(public tagService: TagService, private message: NzMessageService) {
    }

    pageNum: number = 1;

    pageSize: number = 10;

    showPupup: boolean = false;

    updateReqBody = {
        id: null,
        name: null
    };


    ngOnInit() {
        this.getData();
    }

    getData() {
        this.tagService.getTags(this.pageNum, this.pageSize);
    }

    toPage(e: number) {
        this.pageNum = e;
        this.getData();
    }


    edit(id, name) {
        this.showPupup = true;
        this.updateReqBody.id = id;
        this.updateReqBody.name = name;
    }

    update() {
        if (this.updateReqBody.name === '') {
            this.message.warning('不能为空');
            return;
        }
        this.showPupup = false;
        this.tagService.update(this.updateReqBody.id, this.updateReqBody.name).subscribe(data => {
            if (data.code === 0) {
                this.message.success('修改成功！');
                this.getData();
            }
        });
    }


    doDel(id) {
        this.tagService.delete(id).subscribe(data => {
            if (data.code === 0) {
                this.message.success('删除成功');
                this.getData();
            } else {
                this.message.error(`删除失败，原因：${data.msg}`);
            }
        });
    }
}
