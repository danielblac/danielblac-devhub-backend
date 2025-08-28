"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostsController = void 0;
const common_1 = require("@nestjs/common");
const blog_posts_service_1 = require("./blog-posts.service");
const create_blog_post_dto_1 = require("./dto/create-blog-post.dto");
const update_blog_post_dto_1 = require("./dto/update-blog-post.dto");
const comment_dto_1 = require("./dto/comment.dto");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
let BlogPostsController = class BlogPostsController {
    constructor(blogPostsService) {
        this.blogPostsService = blogPostsService;
    }
    async create(createBlogPostDto) {
        return this.blogPostsService.create(createBlogPostDto);
    }
    async findAll(published, featured, category, tag) {
        return this.blogPostsService.findAll({
            published,
            featured,
            category,
            tag,
        });
    }
    async getCategories() {
        const categories = await this.blogPostsService.getCategories();
        return {
            message: 'Categories retrieved successfully',
            data: categories,
        };
    }
    async getTags() {
        const tags = await this.blogPostsService.getTags();
        return {
            message: 'Tags retrieved successfully',
            data: tags,
        };
    }
    async findOne(id) {
        return this.blogPostsService.findOne(id);
    }
    async findBySlug(slug) {
        return this.blogPostsService.findBySlug(slug);
    }
    async update(id, updateBlogPostDto) {
        return this.blogPostsService.update(id, updateBlogPostDto);
    }
    async remove(id) {
        return this.blogPostsService.remove(id);
    }
    async like(id) {
        return this.blogPostsService.likePost(id);
    }
    async incrementView(id) {
        return this.blogPostsService.viewPost(id);
    }
    async incrementViewBySlug(slug) {
        return this.blogPostsService.viewPostBySlug(slug);
    }
    async addComment(id, addCommentDto) {
        return this.blogPostsService.addComment(id, addCommentDto);
    }
    async getRelatedPosts(id, limit = 3) {
        return this.blogPostsService.getRelatedPosts(id, limit);
    }
};
exports.BlogPostsController = BlogPostsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Blog post created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_post_dto_1.CreateBlogPostDto]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Blog posts retrieved successfully',
    }),
    (0, swagger_1.ApiQuery)({ name: 'published', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'featured', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'tag', required: false, type: String }),
    __param(0, (0, common_1.Query)('published')),
    __param(1, (0, common_1.Query)('featured')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('tag')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Boolean, String, String]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Categories retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('tags'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tags retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "getTags", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog post found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog post not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog post found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog post not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog post updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog post not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_post_dto_1.UpdateBlogPostDto]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog post deleted' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog post not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog post liked' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog post not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "like", null);
__decorate([
    (0, common_1.Patch)(':id/view'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'View counted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog post not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "incrementView", null);
__decorate([
    (0, common_1.Patch)('slug/:slug/view'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'View counted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog post not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "incrementViewBySlug", null);
__decorate([
    (0, common_1.Post)(':id/comment'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comment added' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog post not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comment_dto_1.AddCommentDto]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Get)(':id/related'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Related posts retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog post not found' }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of related posts to return',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BlogPostsController.prototype, "getRelatedPosts", null);
exports.BlogPostsController = BlogPostsController = __decorate([
    (0, swagger_1.ApiTags)('blog-posts'),
    (0, common_1.Controller)('blog-posts'),
    __metadata("design:paramtypes", [blog_posts_service_1.BlogPostsService])
], BlogPostsController);
//# sourceMappingURL=blog-posts.controller.js.map