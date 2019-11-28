import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {WebUpdateService} from '../../services/update/web-update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(public updateService: WebUpdateService,
              private titleService: Title) {
    titleService.setTitle('小海博客|更新');
  }


  ngOnInit() {
    if (this.updateService.updateInfoList == null) {
      this.updateService.getUpdateInfo();
    }
    window.scrollTo(0, 0);
    if (!this.updateService.lastestUpdateTime) {
      this.updateService.getLastestUpdateTime();
    }
  }

}
