import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../api/api.service';
import {Link} from '../../class/Link';

@Component({
    selector: 'view-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.less']
})
export class LinkComponent implements OnInit {

    constructor(private message: NzMessageService,
                private titleService: Title,
                private apiService: ApiService) {
        titleService.setTitle('小海博客 | 友链');
    }

    showModal = false;

    // 申请时的链接
    link: Link;

    linkList: Link[];

    ngOnInit() {
        window.scrollTo(0, 0);
        this.link = new Link();
        this.apiService.links().subscribe(data => {
                this.linkList = data.result;
            },
            error => {
                this.message.error(error.msg);
            });
    }

    apply() {
        if (this.link.name === '') {
            this.message.error('网站名称不能为空');
            return;
        }
        if (this.link.url === '') {
            this.message.error('网站链接不能为空');
            return;
        }
        const regExp = /^(https:\/\/|http:\/\/|)([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
        if (!regExp.test(this.link.url)) {
            this.message.error('网站链接输入不合法');
            return;
        }
        this.showModal = false;
        this.apiService.applyLink(this.link).subscribe(data => {
                this.message.success('提交成功，请稍等，即将为你处理');
            },
            error => {
                this.message.error('提交失败，原因：' + error.msg);
            });
    }

    cancel() {
        this.showModal = false;
        this.link.name = null;
        this.link.url = null;
    }


}
