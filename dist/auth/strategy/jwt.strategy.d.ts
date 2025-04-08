import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { User } from '../../schemas/user.schema';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(config: ConfigService, userModel: mongoose.Model<User>);
    validate(payload: {
        id: string;
        username: string;
    }): Promise<mongoose.Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
export {};
