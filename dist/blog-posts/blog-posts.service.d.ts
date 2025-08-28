import { Model } from 'mongoose';
import { BlogPost } from '../schemas/blog-post.schema';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { AddCommentDto } from './dto/comment.dto';
export declare class BlogPostsService {
    private blogPostModel;
    constructor(blogPostModel: Model<BlogPost>);
    create(dto: CreateBlogPostDto): Promise<{
        message: string;
        data: BlogPost;
    }>;
    findAll(filters?: {
        published?: boolean;
        featured?: boolean;
        category?: string;
        tag?: string;
        limit?: number;
        exclude?: string;
    }): Promise<{
        message: string;
        data: BlogPost[];
        count: number;
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: BlogPost;
    }>;
    findBySlug(slug: string): Promise<{
        message: string;
        data: BlogPost;
    }>;
    update(id: string, dto: UpdateBlogPostDto): Promise<{
        message: string;
        data: BlogPost;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: BlogPost;
    }>;
    likePost(id: string): Promise<BlogPost>;
    viewPost(id: string): Promise<BlogPost>;
    viewPostBySlug(slug: string): Promise<BlogPost>;
    addComment(id: string, dto: AddCommentDto): Promise<BlogPost>;
    getCategories(): Promise<string[]>;
    getTags(): Promise<string[]>;
    private generateSlug;
    private calculateReadingTime;
    getRelatedPosts(id: string, limit?: number): Promise<{
        message: string;
        data: BlogPost[];
    }>;
}
