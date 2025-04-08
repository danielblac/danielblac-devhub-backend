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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("../schemas/project.schema");
let ProjectsService = class ProjectsService {
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    async create(dto) {
        try {
            const project = new this.projectModel(dto);
            const newProject = await project.save();
            return {
                message: 'Project Created Successfully',
                data: newProject,
            };
        }
        catch (error) {
            console.error('Error creating project:', error);
            throw new common_1.InternalServerErrorException('Failed to create project');
        }
    }
    async findAll(featured) {
        try {
            const query = featured ? { featured: true } : {};
            const projects = await this.projectModel
                .find(query)
                .sort({ createdAt: -1 })
                .exec();
            return {
                message: 'Projects retrieved successfully',
                data: projects,
                count: projects.length,
            };
        }
        catch (error) {
            console.error('Error retrieving projects:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve projects');
        }
    }
    async findOne(id) {
        try {
            const project = await this.projectModel.findById(id).exec();
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            return {
                message: 'User retrieved successfully',
                data: project,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Invalid project ID');
        }
    }
    async update(id, dto) {
        try {
            const project = await this.projectModel
                .findByIdAndUpdate(id, dto, { new: true })
                .exec();
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            return {
                message: 'User Updated Successfully',
                data: project,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to update project');
        }
    }
    async remove(id) {
        try {
            const result = await this.projectModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException('Project not found');
            }
            return { message: 'Project deleted successfully', data: result };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to delete project');
        }
    }
    async likeProject(id) {
        try {
            const project = await this.projectModel
                .findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
                .exec();
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            return project;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to like project');
        }
    }
    async viewProject(id) {
        try {
            const project = await this.projectModel
                .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
                .exec();
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            return project;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to increment view count');
        }
    }
    async addComment(id, dto) {
        try {
            const project = await this.projectModel
                .findByIdAndUpdate(id, {
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
            }, { new: true })
                .exec();
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            return project;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to add comment');
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map