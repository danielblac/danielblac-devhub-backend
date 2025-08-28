import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { AddCommentDto } from './dto/comment.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('blog-posts')
@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Blog post created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogPostsService.create(createBlogPostDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Blog posts retrieved successfully',
  })
  @ApiQuery({ name: 'published', required: false, type: Boolean })
  @ApiQuery({ name: 'featured', required: false, type: Boolean })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'tag', required: false, type: String })
  async findAll(
    @Query('published') published?: boolean,
    @Query('featured') featured?: boolean,
    @Query('category') category?: string,
    @Query('tag') tag?: string,
  ) {
    return this.blogPostsService.findAll({
      published,
      featured,
      category,
      tag,
    });
  }

  @Get('categories')
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
  })
  async getCategories() {
    const categories = await this.blogPostsService.getCategories();
    return {
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  @Get('tags')
  @ApiResponse({ status: 200, description: 'Tags retrieved successfully' })
  async getTags() {
    const tags = await this.blogPostsService.getTags();
    return {
      message: 'Tags retrieved successfully',
      data: tags,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Blog post found' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async findOne(@Param('id') id: string) {
    return this.blogPostsService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiResponse({ status: 200, description: 'Blog post found' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async findBySlug(@Param('slug') slug: string) {
    return this.blogPostsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Blog post updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.blogPostsService.update(id, updateBlogPostDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Blog post deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async remove(@Param('id') id: string) {
    return this.blogPostsService.remove(id);
  }

  @Post(':id/like')
  @ApiResponse({ status: 200, description: 'Blog post liked' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async like(@Param('id') id: string) {
    return this.blogPostsService.likePost(id);
  }

  @Patch(':id/view')
  @ApiResponse({ status: 200, description: 'View counted' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async incrementView(@Param('id') id: string) {
    return this.blogPostsService.viewPost(id);
  }

  // Also add for slug-based view increment
  @Patch('slug/:slug/view')
  @ApiResponse({ status: 200, description: 'View counted' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async incrementViewBySlug(@Param('slug') slug: string) {
    return this.blogPostsService.viewPostBySlug(slug);
  }

  @Post(':id/comment')
  @ApiResponse({ status: 200, description: 'Comment added' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async addComment(
    @Param('id') id: string,
    @Body() addCommentDto: AddCommentDto,
  ) {
    return this.blogPostsService.addComment(id, addCommentDto);
  }

  @Get(':id/related')
  @ApiResponse({ status: 200, description: 'Related posts retrieved' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of related posts to return',
  })
  async getRelatedPosts(
    @Param('id') id: string,
    @Query('limit') limit: number = 3,
  ) {
    return this.blogPostsService.getRelatedPosts(id, limit);
  }
}
