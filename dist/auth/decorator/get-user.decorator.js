"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
        throw new common_1.UnauthorizedException('User not found in request');
    }
    if (data) {
        if (!request.user[data]) {
            throw new common_1.UnauthorizedException(`User ${String(data)} not found`);
        }
        return request.user[data];
    }
    return request.user;
});
//# sourceMappingURL=get-user.decorator.js.map