import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Role })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
