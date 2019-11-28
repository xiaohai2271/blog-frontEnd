import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {User} from '../../class/user';
import {LoginReq} from '../../class/loginReq';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpService) {
  }

  userInfo: User;

  // 刚注册完账户 实现自动填充账户的临时存储  登录成功即置空
  tempUser: LoginReq;

  loginModalType: 'login' | 'registration' = 'login';
  loginModalVisible: boolean = false;


  showModal(type: 'login' | 'registration') {
    this.loginModalType = type;
    this.loginModalVisible = true;
  }


  /**
   * 获取用户信息
   */
  getUserInfo() {
    const observable = this.http.get('/user/userInfo');
    observable.subscribe((data: any) => {
      if (data.code === 0) {
        this.userInfo = data.result;
      }
    });
    return observable;
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

  /**
   * 登录
   * @param loginReq 请求体
   */
  login(loginReq: {
    'email': string,
    'isRememberMe': boolean,
    'password': string
  }) {
    const observable = this.http.post('/login', loginReq, true);
    observable.subscribe((data: any) => {
      if (data.code === 0) {
        this.userInfo = data.result;
        this.loginModalVisible = false;
        this.http.setToken(data.result.token);
      }
    });
    return observable;
  }

  registration(emailStr: string, pwd: string) {
    const submitBody = {
      email: emailStr,
      password: pwd
    };
    return this.http.post('/registration', submitBody, false);
    //  注册成功 ->  登录 在component里面实现了
  }


  emailVerify(reqBody) {
    return this.http.post('/emailVerify', reqBody, false);
  }

  resetPWd(reqBody) {
    return this.http.post('/resetPwd', reqBody, false);
  }

  sendResetPwdEmail(emailStr: string) {
    return this.http.post('/sendResetPwdEmail', {email: emailStr}, false);
  }

  imgCodeVerify(codeStr: string) {
    return this.http.post('/verCode', {code: codeStr}, false);
  }

}
