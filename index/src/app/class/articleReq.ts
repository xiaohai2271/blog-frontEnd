export class ArticleReq {
  category: string;
  id?: number;
  mdContent: string;
  open: boolean;
  tags: string;
  title: string;
  type: boolean;
  url?: string;

  constructor() {
    this.type = true;
  }
}
