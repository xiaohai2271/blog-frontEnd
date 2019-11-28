export class CommentReq {
  articleID: number;
  comment: boolean;
  content: string;
  id: number;
  pid: number;
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
