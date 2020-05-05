import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {User} from '../../classes/user';
import {Page} from '../../classes/page';
import {exist} from '../../utils/dataUtil';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userInfo: User;

    avatarHost: string = 'http://cdn.celess.cn';

    constructor(public http: HttpService) {
    }

    userPage: Page<User>[] = [];
    currentUserPage: Page<User>;

    /**
     * 获取用户信息
     */
    getUserInfo() {
        return this.http.get('/user/userInfo');
    }

    /**
     * 注销登录
     */
    logout() {
        this.http.get('/logout').subscribe((data: any) => {
            if (data.code === 0) {
                this.userInfo = null;
                this.http.removeToken();
            }
        });
    }


    updateInfo(submitBody: { desc: string, displayName: string }) {
        const observable = this.http.put('/user/userInfo/update', submitBody, false);
        observable.subscribe(data => {
            if (data.code === 0) {
                this.userInfo.desc = submitBody.desc;
                this.userInfo.displayName = submitBody.displayName;
            }
        });
        return observable;
    }


    sendEmail() {
        return this.http.post('/sendVerifyEmail', {email: this.userInfo.email}, false);
    }

    /**
     * 获取分页数据
     * @param pageNum 页码
     * @param pageSize 单页数据量
     * @param refresh 是否强制刷新
     */
    getPageUser(pageNum: number, pageSize: number, refresh: boolean = false) {
        const existData = exist<User>(pageNum, pageSize, this.userPage);
        if (existData && !refresh) {
            existData.subscribe(data => {
                this.currentUserPage = data;
            });
        }
        this.http.get(`/admin/users?page=${pageNum}&count=${pageSize}`).subscribe(data => {
            if (data.code === 0) {
                this.currentUserPage = data.result;
                this.userPage.unshift(data.result);
            }
        });
    }

    delete(id: number) {
        return this.http.delete(`/admin/user/delete/${id}`);
    }

    update(user: User) {
        return this.http.put('/admin/user', user, true);
    }

    getExistOfEmail(email: string) {
        return this.http.get(`/emailStatus/${email}`);
    }
}
