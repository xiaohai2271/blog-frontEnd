export class Comment {
    id: number;
    type: number;
    authorName: string;
    authorAvatarImgUrl: string;
    content: string;
    date: string;
    pid: number;
    responseId: string;
    articleID: number;
    articleTitle: string;
    child: Comment[];
}
