import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  cover_img: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  live_link: string;

  @Prop()
  github_link: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: false })
  featured: boolean;

  @Prop([
    {
      name: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ])
  comments: {
    name: string;
    text: string;
    createdAt: Date;
  }[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
