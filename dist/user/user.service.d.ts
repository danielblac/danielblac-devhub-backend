import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(dto: CreateUserDto): Promise<{
        message: string;
        data: {
            _id: unknown;
            username: string;
            full_name: string;
            role: import("../schemas/user.schema").Role;
        };
    }>;
    findAll(): Promise<{
        message: string;
        data: User[];
        count: number;
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: User;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        message: string;
        data: User;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: User;
    }>;
}
