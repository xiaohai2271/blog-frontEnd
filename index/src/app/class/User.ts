export class User {
    id: number;
    email: string;
    displayName: string;
    emailStatus: boolean;
    avatarImgUrl?: string;
    desc: string;
    role: string;
    token?: string;
    pwd?: string;
    recentlyLandedDate?: string
}

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
