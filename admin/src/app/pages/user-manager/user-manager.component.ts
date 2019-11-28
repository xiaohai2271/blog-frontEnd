import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../classes/user';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-user-manager',
    templateUrl: './user-manager.component.html',
    styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

    constructor(public userService: UserService,
                private messageService: NzMessageService) {
    }

    pageNum: number = 1;
    pageSize: number = 10;
    showPupup: boolean = false;
    editUser: User = new User();
    showError: boolean = false;
    formerEmail: string;

    ngOnInit() {
        this.userService.getPageUser(this.pageNum, this.pageSize);
    }

    toPage(e: number) {
        this.pageNum = e;
        this.userService.getPageUser(this.pageNum, this.pageSize);
    }

    edit(user: User) {
        this.showPupup = true;
        this.showError = false;
        // 避免引用赋值，采用json进行浅拷贝！！
        this.editUser = JSON.parse(JSON.stringify(user));
        this.formerEmail = this.editUser.email;
    }

    delete(id: number) {
        this.userService.delete(id).subscribe(data => {
            if (data.code === 0) {
                if (data.result[0].status) {
                    this.messageService.success('删除成功！');
                    this.userService.getPageUser(this.pageNum, this.pageSize);
                } else {
                    this.messageService.error(`删除失败，原因:${data.result[0].msg}`);
                }
            } else {
                this.messageService.error(`请求失败，原因:${data.msg}`);
            }
        });
    }

    update() {
        this.editUser.recentlyLandedDate = null;
        this.editUser.avatarImgUrl = null;
        if (this.showError) {
            this.showPupup = false;
            this.messageService.warning('邮箱不可用，请修改！');
            return;
        }
        this.userService.update(this.editUser).subscribe(data => {
            if (data.code === 0) {
                this.messageService.success('修改成功！');
                if (this.userService.userInfo.id === this.editUser.id) {
                    this.userService.userInfo = this.editUser;
                }
                this.userService.getPageUser(this.pageNum, this.pageSize, true);
            } else {
                this.messageService.error('修改失败！');
            }
        });
        this.showPupup = false;
    }


    getEmailStatus() {
        if (this.editUser.email === this.formerEmail) {
            return;
        }
        this.userService.getExistOfEmail(this.editUser.email).subscribe(data => {
            if (data.code === 0) {
                this.showError = data.result;
            } else {
                this.messageService.error(data.msg);
            }
        });
    }
}
