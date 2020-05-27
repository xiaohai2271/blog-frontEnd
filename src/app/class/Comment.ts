import {User} from './User';

export class Comment {
    id?: number;
    fromUser: User;
    toUser?: User;
    content: string;
    pagePath: string;
    date?: string;
    pid: number;
    respComment: Comment[];
    status: number;
}


export class CommentReq {
    id?: number;
    content: string;
    pid: number = -1;
    toUserId: number;
    pagePath: string;

    constructor(pagePath: string) {
        this.pagePath = pagePath;
    }
}
