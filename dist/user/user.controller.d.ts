import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
        data: import("../schemas/user.schema").User[];
        count: number;
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("../schemas/user.schema").User;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        message: string;
        data: import("../schemas/user.schema").User;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: import("../schemas/user.schema").User;
    }>;
}
