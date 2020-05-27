import {Tag} from './Tag';
import {User} from './User';

export class Article {
    id: number;
    title: string;
    summary: string;
    mdContent?: string;
    original?: boolean;
    url?: string;
    publishDateFormat: string;
    updateDateFormat?: string;
    category?: string;
    tags?: Tag[];
    author: User;
    preArticle?: Article;
    nextArticle?: Article;
    readingNumber: number;
    likeCount: number;
    dislikeCount: number;
    open?: string;
}


export class ArticleReq {
    category: string;
    id?: number;
    mdContent: string;
    open: boolean;
    tags: string[];
    title: string;
    type: boolean;
    url?: string;

    constructor() {
        this.type = true;
    }
}
