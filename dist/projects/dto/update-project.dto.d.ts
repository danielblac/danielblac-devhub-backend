import { CreateProjectDto } from './create-project.dto';
declare const UpdateProjectDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProjectDto>>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
    title?: string;
    cover_img?: string;
    description?: string;
    live_link?: string;
    github_link?: string;
    featured?: boolean;
}
export {};
