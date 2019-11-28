import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {UserService} from '../../services/user/user.service';
import {User} from '../../classes/user';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

    constructor(public userService: UserService,
                private message: NzMessageService) {
    }

    host: string;

    user: User = new User();

    clickable: boolean = true;

    ngOnInit() {
        if (!this.userService.userInfo) {
            setTimeout(() => {
                this.user = this.userService.userInfo;
            }, 500);
        } else {
            this.user = this.userService.userInfo;
        }
        this.host = environment.host;
    }


    userInfoSubmit() {
        const info = {
            desc: this.user.desc,
            displayName: this.user.displayName
        };
        this.userService.updateInfo(info).subscribe(data => {
            if (data.code === 0) {
                this.message.success('修改成功');
            } else if (data.code === 301) {
                window.location.href = '/login';
            } else {
                this.message.error('修改信息失败，原因：' + data.msg);
            }
        });
    }

    sendEmail() {
        this.clickable = false;
        if (!this.userService.userInfo) {
            window.location.href = '/login';
        }
        this.userService.sendEmail().subscribe(data => {
            if (data.code === 0) {
                this.message.success('发送成功！请前往邮箱进行激活');
            } else {
                this.message.error(data.msg);
            }
        });
    }

    avatarUpload(info: any) {
        if (info.type === 'success' && info.file.response.code === 0) {
            const time = new Date().valueOf();
            this.userService.userInfo.avatarImgUrl = this.userService.avatarHost + '/' + info.file.response.result;
            // 加上时间戳 让图片自动预览，避免读取本地缓存而不显示新头像
            this.user.avatarImgUrl = this.userService.avatarHost + '/' + info.file.response.result + '?time=' + time;
        }
    }
}
