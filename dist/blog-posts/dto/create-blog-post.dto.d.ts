export declare class CreateBlogPostDto {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    cover_img: string;
    author?: string;
    category: string;
    tags?: string[];
    published?: boolean;
    featured?: boolean;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string[];
    reading_time?: number;
}
