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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BookService = class BookService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async create(createBookDto, userId) {
        const newBook = new this.bookModel({
            ...createBookDto,
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        const book = await newBook.save();
        return {
            message: 'Book Created Successfully',
            data: book,
        };
    }
    async findAll(userId) {
        const books = await this.bookModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate({
            path: 'userId',
            select: '-password',
        })
            .sort({ createdAt: -1 })
            .exec();
        return {
            message: 'Books retrieved successfully',
            data: books,
        };
    }
    async findOne(id, userId) {
        const book = await this.bookModel
            .findOne({
            _id: new mongoose_2.Types.ObjectId(id),
            userId: new mongoose_2.Types.ObjectId(userId),
        })
            .populate({
            path: 'userId',
            select: '-password',
        })
            .exec();
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return {
            message: 'Book retrieved successfully',
            data: book,
        };
    }
    async update(id, updateBookDto, userId) {
        const book = await this.bookModel
            .findOneAndUpdate({
            _id: new mongoose_2.Types.ObjectId(id),
            userId: new mongoose_2.Types.ObjectId(userId),
        }, updateBookDto, { new: true })
            .populate('userId')
            .exec();
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return {
            message: 'Book Updated Successfully',
            data: book,
        };
    }
    async remove(id, userId) {
        const result = await this.bookModel
            .findOneAndDelete({
            _id: new mongoose_2.Types.ObjectId(id),
            userId: new mongoose_2.Types.ObjectId(userId),
        })
            .exec();
        if (!result) {
            throw new common_1.NotFoundException('Project not found');
        }
        return { message: 'Project deleted successfully', data: result };
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Book')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookService);
//# sourceMappingURL=book.service.js.map