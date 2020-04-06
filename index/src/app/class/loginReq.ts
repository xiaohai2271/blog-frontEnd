export class LoginReq {
    email: string;
    isRememberMe: boolean;
    password: string;

    constructor(email: string, isRememberMe: boolean, password: string) {
        this.email = email;
        this.isRememberMe = isRememberMe;
        this.password = password;
    }
}