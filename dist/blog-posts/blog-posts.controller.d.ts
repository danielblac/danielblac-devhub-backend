import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { AddCommentDto } from './dto/comment.dto';
export declare class BlogPostsController {
    private readonly blogPostsService;
    constructor(blogPostsService: BlogPostsService);
    create(createBlogPostDto: CreateBlogPostDto): Promise<{
        message: string;
        data: import("../schemas/blog-post.schema").BlogPost;
    }>;
    findAll(published?: boolean, featured?: boolean, category?: string, tag?: string): Promise<{
        message: string;
        data: import("../schemas/blog-post.schema").BlogPost[];
        count: number;
    }>;
    getCategories(): Promise<{
        message: string;
        data: string[];
    }>;
    getTags(): Promise<{
        message: string;
        data: string[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("../schemas/blog-post.schema").BlogPost;
    }>;
    findBySlug(slug: string): Promise<{
        message: string;
        data: import("../schemas/blog-post.schema").BlogPost;
    }>;
    update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<{
        message: string;
        data: import("../schemas/blog-post.schema").BlogPost;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("../schemas/blog-post.schema").BlogPost;
    }>;
    like(id: string): Promise<import("../schemas/blog-post.schema").BlogPost>;
    incrementView(id: string): Promise<import("../schemas/blog-post.schema").BlogPost>;
    incrementViewBySlug(slug: string): Promise<import("../schemas/blog-post.schema").BlogPost>;
    addComment(id: string, addCommentDto: AddCommentDto): Promise<import("../schemas/blog-post.schema").BlogPost>;
    getRelatedPosts(id: string, limit?: number): Promise<{
        message: string;
        data: import("../schemas/blog-post.schema").BlogPost[];
    }>;
}
