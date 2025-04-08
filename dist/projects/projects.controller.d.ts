import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddCommentDto } from './dto/comment.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<{
        message: string;
        data: import("../schemas/project.schema").Project;
    }>;
    findAll(featured?: boolean): Promise<{
        message: string;
        data: import("../schemas/project.schema").Project[];
        count: number;
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("../schemas/project.schema").Project;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        message: string;
        data: import("../schemas/project.schema").Project;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("../schemas/project.schema").Project;
    }>;
    like(id: string): Promise<import("../schemas/project.schema").Project>;
    view(id: string): Promise<import("../schemas/project.schema").Project>;
    addComment(id: string, addCommentDto: AddCommentDto): Promise<import("../schemas/project.schema").Project>;
}
