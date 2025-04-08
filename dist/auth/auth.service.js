"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const argon = require("argon2");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userModel, jwt) {
        this.userModel = userModel;
        this.jwt = jwt;
    }
    async register(dto) {
        const existingUser = await this.userModel.findOne({
            username: dto.username,
        });
        if (existingUser) {
            throw new common_1.ConflictException('Username already exists');
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
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new common_1.InternalServerErrorException('Failed to create user');
        }
    }
    async login(dto) {
        const { username, password } = dto;
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const comparePassword = await argon.verify(user.password, password);
        if (!comparePassword) {
            throw new common_1.UnauthorizedException('Incorrect Credentials');
        }
        delete user.password;
        return await this.generateTokens(user);
    }
    async generateTokens(user) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map