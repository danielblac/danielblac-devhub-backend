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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const argon = require("argon2");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(dto) {
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
    async findAll() {
        try {
            const users = await this.userModel.find().select('-password').exec();
            return {
                message: 'Users retrieved successfully',
                data: users,
                count: users.length,
            };
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve users');
        }
    }
    async findOne(id) {
        try {
            if (!(0, mongoose_2.isValidObjectId)(id)) {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            const user = await this.userModel.findById(id).select('-password').exec();
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return {
                message: 'User retrieved successfully',
                data: user,
            };
        }
        catch (error) {
            console.error('Error retrieving user:', error);
            throw new common_1.BadRequestException('Invalid user ID');
        }
    }
    async update(id, dto) {
        try {
            if (dto.password) {
                dto.password = await argon.hash(dto.password);
            }
            const updatedUser = await this.userModel
                .findByIdAndUpdate(id, dto, { new: true })
                .select('-password')
                .exec();
            if (!updatedUser) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return {
                message: 'User Updated Successfully',
                data: updatedUser,
            };
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw new common_1.InternalServerErrorException('Failed to update user');
        }
    }
    async remove(id) {
        try {
            const result = await this.userModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            return { message: 'User deleted successfully', data: result };
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw new common_1.InternalServerErrorException('Failed to delete user');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map