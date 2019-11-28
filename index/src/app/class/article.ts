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
