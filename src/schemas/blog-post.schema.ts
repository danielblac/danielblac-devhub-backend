import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BlogPost extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  cover_img: string;

  @Prop({ default: 'DanielBlac DevHub' })
  author: string;

  @Prop({ required: true })
  category: string;

  @Prop([String])
  tags: string[];

  @Prop({ default: false })
  published: boolean;

  @Prop({ default: false })
  featured: boolean;

  @Prop()
  meta_title: string;

  @Prop()
  meta_description: string;

  @Prop([String])
  meta_keywords: string[];

  @Prop({ default: 0 })
  reading_time: number;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

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

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
