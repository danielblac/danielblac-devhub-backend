import { CreateUserDto } from './create-user.dto';
import { Role } from '../enums/role.enum';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    username?: string;
    full_name?: string;
    password?: string;
    role?: Role;
}
export {};
