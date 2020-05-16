export class Comment {
    id?: number;
    authorName?: string;
    authorAvatarImgUrl?: string;
    content: string;
    articleID: number;
    articleTitle: string;
    date?: string;
    responseId: string;
    pid: number;
    comment: boolean;
    respComment: Comment[];
}


export class CommentReq {
    id?: number;
    comment: boolean;
    content: string;
    pid: number;
    articleID: number;
    responseId: string;

    constructor(comment: boolean) {
        this.comment = comment;
        this.responseId = '';
        if (!comment) {
            this.articleID = -1;
        }
        this.pid = -1;
        this.id = null;
    }
}
