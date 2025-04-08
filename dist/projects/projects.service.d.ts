import { Model } from 'mongoose';
import { Project } from '../schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddCommentDto } from './dto/comment.dto';
export declare class ProjectsService {
    private projectModel;
    constructor(projectModel: Model<Project>);
    create(dto: CreateProjectDto): Promise<{
        message: string;
        data: Project;
    }>;
    findAll(featured?: boolean): Promise<{
        message: string;
        data: Project[];
        count: number;
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: Project;
    }>;
    update(id: string, dto: UpdateProjectDto): Promise<{
        message: string;
        data: Project;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: Project;
    }>;
    likeProject(id: string): Promise<Project>;
    viewProject(id: string): Promise<Project>;
    addComment(id: string, dto: AddCommentDto): Promise<Project>;
}
