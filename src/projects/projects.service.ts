import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddCommentDto } from './dto/comment.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(dto: CreateProjectDto): Promise<{
    message: string;
    data: Project;
  }> {
    try {
      const project = new this.projectModel(dto);
      const newProject = await project.save();
      return {
        message: 'Project Created Successfully',
        data: newProject,
      };
    } catch (error) {
      console.error('Error creating project:', error);
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  async findAll(featured?: boolean): Promise<{
    message: string;
    data: Project[];
    count: number;
  }> {
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
    } catch (error) {
      console.error('Error retrieving projects:', error);
      throw new InternalServerErrorException('Failed to retrieve projects');
    }
  }

  async findOne(id: string): Promise<{ message: string; data: Project }> {
    try {
      const project = await this.projectModel.findById(id).exec();

      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return {
        message: 'Project retrieved successfully',
        data: project,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid project ID');
    }
  }

  async update(
    id: string,
    dto: UpdateProjectDto,
  ): Promise<{
    message: string;
    data: Project;
  }> {
    try {
      const project = await this.projectModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return {
        message: 'User Updated Successfully',
        data: project,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update project');
    }
  }

  async remove(id: string): Promise<{ message: string; data: Project }> {
    try {
      const result = await this.projectModel.findByIdAndDelete(id).exec();

      if (!result) {
        throw new NotFoundException('Project not found');
      }

      return { message: 'Project deleted successfully', data: result };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete project');
    }
  }

  async likeProject(id: string): Promise<Project> {
    try {
      const project = await this.projectModel
        .findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
        .exec();

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to like project');
    }
  }

  async viewProject(id: string): Promise<Project> {
    try {
      const project = await this.projectModel
        .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
        .exec();

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to increment view count');
    }
  }

  async addComment(id: string, dto: AddCommentDto): Promise<Project> {
    try {
      const project = await this.projectModel
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

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to add comment');
    }
  }
}
