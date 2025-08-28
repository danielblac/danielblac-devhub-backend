import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from '../schemas/blog-post.schema';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { AddCommentDto } from './dto/comment.dto';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
  ) {}

  async create(dto: CreateBlogPostDto): Promise<{
    message: string;
    data: BlogPost;
  }> {
    try {
      // Generate slug if not provided
      if (!dto.slug) {
        dto.slug = this.generateSlug(dto.title);
      }

      // Calculate reading time
      dto.reading_time = this.calculateReadingTime(dto.content);

      const blogPost = new this.blogPostModel(dto);
      const newBlogPost = await blogPost.save();

      return {
        message: 'Blog post created successfully',
        data: newBlogPost,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Slug already exists');
      }
      console.error('Error creating blog post:', error);
      throw new InternalServerErrorException('Failed to create blog post');
    }
  }

  async findAll(filters?: {
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
  }> {
    try {
      const query: any = {};

      if (filters?.published !== undefined) {
        query.published = filters.published;
      }

      if (filters?.featured !== undefined) {
        query.featured = filters.featured;
      }

      if (filters?.category) {
        query.category = filters.category;
      }

      if (filters?.tag) {
        query.tags = filters.tag;
      }

      if (filters?.exclude) {
        query._id = { $ne: filters.exclude };
      }

      let queryBuilder = this.blogPostModel.find(query).sort({ createdAt: -1 });

      if (filters?.limit) {
        queryBuilder = queryBuilder.limit(filters.limit);
      }

      const blogPosts = await queryBuilder.exec();

      return {
        message: 'Blog posts retrieved successfully',
        data: blogPosts,
        count: blogPosts.length,
      };
    } catch (error) {
      console.error('Error retrieving blog posts:', error);
      throw new InternalServerErrorException('Failed to retrieve blog posts');
    }
  }

  async findOne(id: string): Promise<{ message: string; data: BlogPost }> {
    try {
      const blogPost = await this.blogPostModel.findById(id).exec();

      if (!blogPost) {
        throw new NotFoundException('Blog post not found');
      }

      return {
        message: 'Blog post retrieved successfully',
        data: blogPost,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid blog post ID');
    }
  }

  async findBySlug(slug: string): Promise<{ message: string; data: BlogPost }> {
    try {
      const blogPost = await this.blogPostModel.findOne({ slug }).exec();

      if (!blogPost) {
        throw new NotFoundException('Blog post not found');
      }

      return {
        message: 'Blog post retrieved successfully',
        data: blogPost,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid blog post slug');
    }
  }

  async update(
    id: string,
    dto: UpdateBlogPostDto,
  ): Promise<{
    message: string;
    data: BlogPost;
  }> {
    try {
      // Recalculate reading time if content is updated
      if (dto.content) {
        dto.reading_time = this.calculateReadingTime(dto.content);
      }

      const blogPost = await this.blogPostModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();

      if (!blogPost) {
        throw new NotFoundException('Blog post not found');
      }

      return {
        message: 'Blog post updated successfully',
        data: blogPost,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === 11000) {
        throw new BadRequestException('Slug already exists');
      }
      throw new InternalServerErrorException('Failed to update blog post');
    }
  }

  async remove(id: string): Promise<{ message: string; data: BlogPost }> {
    try {
      const result = await this.blogPostModel.findByIdAndDelete(id).exec();

      if (!result) {
        throw new NotFoundException('Blog post not found');
      }

      return { message: 'Blog post deleted successfully', data: result };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete blog post');
    }
  }

  async likePost(id: string): Promise<BlogPost> {
    try {
      const blogPost = await this.blogPostModel
        .findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
        .exec();

      if (!blogPost) {
        throw new NotFoundException('Blog post not found');
      }

      return blogPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to like blog post');
    }
  }

  async viewPost(id: string): Promise<BlogPost> {
    try {
      const blogPost = await this.blogPostModel
        .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
        .exec();

      if (!blogPost) {
        throw new NotFoundException('Blog post not found');
      }

      return blogPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to increment view count');
    }
  }

  async viewPostBySlug(slug: string): Promise<BlogPost> {
    try {
      const blogPost = await this.blogPostModel
        .findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { new: true })
        .exec();

      if (!blogPost) {
        throw new NotFoundException('Blog post not found');
      }

      return blogPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to increment view count');
    }
  }

  async addComment(id: string, dto: AddCommentDto): Promise<BlogPost> {
    try {
      const blogPost = await this.blogPostModel
        .findByIdAndUpdate(
          id,
          {
            $push: {
              comments: {
                $each: [
                  {
                    name: dto.name,
                    text: dto.text,
                  },
                ],
                $sort: { createdAt: -1 },
              },
            },
          },
          { new: true },
        )
        .exec();

      if (!blogPost) {
        throw new NotFoundException('Blog post not found');
      }

      return blogPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to add comment');
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const categories = await this.blogPostModel.distinct('category').exec();

      return categories.filter(
        (category) => category !== null && category !== '',
      );
    } catch (error) {
      console.error('Error retrieving categories:', error);
      throw new InternalServerErrorException('Failed to retrieve categories');
    }
  }

  async getTags(): Promise<string[]> {
    try {
      const tags = await this.blogPostModel.distinct('tags').exec();

      return tags.filter((tag) => tag !== null && tag !== '');
    } catch (error) {
      console.error('Error retrieving tags:', error);
      throw new InternalServerErrorException('Failed to retrieve tags');
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  async getRelatedPosts(
    id: string,
    limit: number = 3,
  ): Promise<{
    message: string;
    data: BlogPost[];
  }> {
    try {
      const currentPost = await this.blogPostModel.findById(id).exec();

      if (!currentPost) {
        throw new NotFoundException('Blog post not found');
      }

      const relatedPosts = await this.blogPostModel
        .find({
          _id: { $ne: id },
          category: currentPost.category,
          published: true,
        })
        .limit(limit)
        .sort({ views: -1, createdAt: -1 })
        .select('title slug excerpt cover_img category reading_time views')
        .exec();

      return {
        message: 'Related posts retrieved successfully',
        data: relatedPosts,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve related posts',
      );
    }
  }
}
