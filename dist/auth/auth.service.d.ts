import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Model } from 'mongoose';
export declare class AuthService {
    private userModel;
    private jwt;
    constructor(userModel: Model<User>, jwt: JwtService);
    register(dto: CreateUserDto): Promise<{
        message: string;
        data: {
            _id: unknown;
            username: string;
            full_name: string;
            role: import("../schemas/user.schema").Role;
        };
    }>;
    login(dto: AuthDto): Promise<{
        message: string;
        data: {
            access_token: string;
            id: unknown;
            username: string;
            full_name: string;
            role: import("../schemas/user.schema").Role;
        };
    }>;
    generateTokens(user: User): Promise<{
        message: string;
        data: {
            access_token: string;
            id: unknown;
            username: string;
            full_name: string;
            role: import("../schemas/user.schema").Role;
        };
    }>;
}
