import { Document } from 'mongoose';
export declare class Project extends Document {
    title: string;
    cover_img: string;
    description: string;
    live_link: string;
    github_link: string;
    likes: number;
    views: number;
    featured: boolean;
    comments: {
        name: string;
        text: string;
        createdAt: Date;
    }[];
}
export declare const ProjectSchema: import("mongoose").Schema<Project, import("mongoose").Model<Project, any, any, any, Document<unknown, any, Project> & Project & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Project, Document<unknown, {}, import("mongoose").FlatRecord<Project>> & import("mongoose").FlatRecord<Project> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
