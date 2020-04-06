export class Comment {
    id?: number;
    authorName?: string;
    authorAvatarImgUrl?: string;
    content: string;
    articleID: number;
    date?: string;
    responseId: string;
    pid: number;
    comment: boolean;
    respComment: Comment[];
}
