import { Role } from '../enums/role.enum';
export declare class CreateUserDto {
    username: string;
    full_name: string;
    password: string;
    role: Role;
}
