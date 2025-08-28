import { Document } from 'mongoose';
export declare class BlogPost extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_img: string;
    author: string;
    category: string;
    tags: string[];
    published: boolean;
    featured: boolean;
    meta_title: string;
    meta_description: string;
    meta_keywords: string[];
    reading_time: number;
    views: number;
    likes: number;
    comments: {
        name: string;
        text: string;
        createdAt: Date;
    }[];
}
export declare const BlogPostSchema: import("mongoose").Schema<BlogPost, import("mongoose").Model<BlogPost, any, any, any, Document<unknown, any, BlogPost> & BlogPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BlogPost, Document<unknown, {}, import("mongoose").FlatRecord<BlogPost>> & import("mongoose").FlatRecord<BlogPost> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
