import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
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

  async login(dto: AuthDto) {
    const { username, password } = dto;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const comparePassword = await argon.verify(user.password, password);
    if (!comparePassword) {
      throw new UnauthorizedException('Incorrect Credentials');
    }

    delete user.password;
    return await this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const payload = {
      id: user._id,
      username: user.username,
      full_name: user.full_name,
      role: user.role,
    };

    const accessToken = await this.jwt.signAsync(payload);

    return {
      message: 'User Signed In Successfully',
      data: {
        ...payload,
        access_token: accessToken,
      },
    };
  }
}
