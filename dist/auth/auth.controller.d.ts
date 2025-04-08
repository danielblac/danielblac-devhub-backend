import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
