import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../api/api.service';
import {ApplyLinkReq, Link} from '../../class/Link';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Color, RandomColor} from '../../utils/color';

@Component({
    selector: 'view-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.less']
})
export class LinkComponent implements OnInit {

    showModal = false;
    // 申请时的链接
    link: Link;
    linkList: Link[];
    loading: boolean = false;
    applyFormGroup: FormGroup;
    colors: Color[];
    private lastUrl: string = '';

    constructor(private message: NzMessageService,
                private titleService: Title,
                private apiService: ApiService,
                private fb: FormBuilder,
                private modal: NzModalService) {
        titleService.setTitle('小海博客 | 友链');
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.link = new Link();
        this.apiService.links().subscribe({
            next: data => this.linkList = data.result,
            error: err => this.message.error(err.msg),
            complete: () => this.colors = RandomColor(this.linkList.length)
        });
        this.applyFormGroup = this.fb.group({
            urlLinkProtocol: ['http://'],
            urlProtocol: ['http://'],
            desc: [null, [Validators.maxLength(255)]],
            email: [null, [Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)]],
            iconPath: [null, [Validators.pattern(/^(https:\/\/|http:\/\/|)([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)]],
            linkUrl: [null, [Validators.required, Validators.pattern(/^([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)]],
            name: [null, [Validators.required, Validators.maxLength(255)]],
            url: [null, [Validators.required, Validators.pattern(/^([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)]]
        });
        this.applyFormGroup.controls.url.valueChanges.subscribe({
            next: data => {
                const linkUrlData: string = this.applyFormGroup.value.linkUrl || '';
                this.applyFormGroup.patchValue({linkUrl: linkUrlData.replace(this.lastUrl, data)});
                this.lastUrl = data;
            },
        })
    }

    apply() {
        const value = this.applyFormGroup.value;
        value.url = value.urlProtocol + value.url;
        value.linkUrl = value.urlLinkProtocol + value.linkUrl;
        const req: ApplyLinkReq = value;
        this.loading = true;
        this.apiService.applyLink(req).subscribe({
            next: data => {
                this.message.success('提交成功，请稍等，即将为你处理');
                this.loading = false;
                this.showModal = false;
                this.applyFormGroup.reset()
            },
            error: err => {
                if (err.code === 7200) {
                    const key = err.result;
                    this.modal.create({
                        nzTitle: '抓取站点失败',
                        nzContent: '暂未在您的网站友链页抓取到本站链接，是否确认已添加并重新提交邮件申请？',
                        nzClosable: false,
                        nzOnOk: () => {
                            this.apiService.reapplyLink(key).subscribe({
                                next: data1 => this.message.success('提交成功，请稍等，即将为你处理'),
                                error: err1 => this.message.error('提交失败，原因：' + err.msg)
                            })
                        }
                    });
                } else {
                    this.message.error('提交失败，原因：' + err.msg);
                }
                this.loading = false;
                this.showModal = false;
                this.applyFormGroup.reset()
            }
        });
    }

    cancel() {
        this.showModal = false;
        this.link.name = null;
        this.link.url = null;
    }


}
