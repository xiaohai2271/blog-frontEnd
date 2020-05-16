export class Article {
    id: number;
    title: string;
    summary: string;
    mdContent?: string;
    original?: boolean;
    url?: string;
    publishDateFormat?: string;
    updateDateFormat?: string;
    category?: string;
    tags?: string[];
    authorName?: string;
    preArticleId?: number;
    nextArticleId?: number;
    preArticleTitle?: string;
    nextArticleTitle?: string;
    readingNumber?: number;
    open?: string;
}


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
