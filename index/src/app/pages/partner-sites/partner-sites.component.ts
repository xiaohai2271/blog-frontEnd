import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {LinkService} from '../../services/link/link.service';

@Component({
  selector: 'app-partner-sites',
  templateUrl: './partner-sites.component.html',
  styleUrls: ['./partner-sites.component.css']
})
export class PartnerSitesComponent implements OnInit {

  constructor(public linkService: LinkService,
              private message: NzMessageService,
              private titleService: Title) {
    titleService.setTitle('小海博客|友链');
  }

  showModal: boolean = false;

  // 申请时的链接
  link = {
    name: '',
    url: ''
  };

  ngOnInit() {
    window.scrollTo(0, 0);
    if (this.linkService.Links == null) {
      this.linkService.getLinks();
    }
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
    this.linkService.apply(this.link).subscribe(data => {
      if (data.code === 0) {
        this.message.success('提交成功，请稍等，即将为你处理');
      } else {
        this.message.error('提交失败，原因：' + data.msg);
      }
    });
  }

  cancel() {
    this.showModal = false;
    this.link.name = null;
    this.link.url = null;
  }


}
