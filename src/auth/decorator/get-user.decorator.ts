import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../schemas/user.schema';

export const GetUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException('User not found in request');
    }

    // Return specific field if requested
    if (data) {
      if (!request.user[data]) {
        throw new UnauthorizedException(`User ${String(data)} not found`);
      }
      return request.user[data];
    }

    // Return full user object by default
    return request.user;
  },
);
