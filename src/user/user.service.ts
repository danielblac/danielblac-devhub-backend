import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      username: dto.username,
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hash = await argon.hash(dto.password);

    try {
      const newUser = new this.userModel({
        ...dto,
        password: hash,
      });

      const user = await newUser.save();

      return {
        message: 'User Created Successfully',
        data: {
          _id: user._id,
          username: user.username,
          full_name: user.full_name,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<{ message: string; data: User[]; count: number }> {
    try {
      const users = await this.userModel.find().select('-password').exec();

      return {
        message: 'Users retrieved successfully',
        data: users,
        count: users.length,
      };
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findOne(id: string): Promise<{ message: string; data: User }> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid user ID');
      }

      const user = await this.userModel.findById(id).select('-password').exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return {
        message: 'User retrieved successfully',
        data: user,
      };
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw new BadRequestException('Invalid user ID');
    }
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<{ message: string; data: User }> {
    try {
      if (dto.password) {
        dto.password = await argon.hash(dto.password);
      }

      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, dto, { new: true })
        .select('-password')
        .exec();

      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return {
        message: 'User Updated Successfully',
        data: updatedUser,
      };
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: string): Promise<{ message: string; data: User }> {
    try {
      const result = await this.userModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { message: 'User deleted successfully', data: result };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
