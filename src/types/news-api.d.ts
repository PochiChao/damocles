export interface NewsArticle {
    key: number;
    author: string;
    content: string;
    description: string;
    publishedAt: Date;
    source: NewsSource;
    title: string;
    url: string;
    urlToImage: string;
}

export interface NewsSource {
    id: string;
    name: string;
}