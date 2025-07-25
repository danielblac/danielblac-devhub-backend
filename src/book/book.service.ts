import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '../schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto, userId: string) {
    const newBook = new this.bookModel({
      ...createBookDto,
      userId: new Types.ObjectId(userId),
    });
    const book = await newBook.save();
    return {
      message: 'Book Created Successfully',
      data: book,
    };
  }

  async findAll(userId: string) {
    const books = await this.bookModel
      .find({ userId: new Types.ObjectId(userId) })
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

  async findOne(id: string, userId: string) {
    const book = await this.bookModel
      .findOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .populate({
        path: 'userId',
        select: '-password',
      })
      .exec();

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return {
      message: 'Book retrieved successfully',
      data: book,
    };
  }

  async update(id: string, updateBookDto: UpdateBookDto, userId: string) {
    const book = await this.bookModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        updateBookDto,
        { new: true },
      )
      .populate('userId')
      .exec();

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return {
      message: 'Book Updated Successfully',
      data: book,
    };
  }

  async remove(id: string, userId: string) {
    const result = await this.bookModel
      .findOneAndDelete({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .exec();

    if (!result) {
      throw new NotFoundException('Project not found');
    }

    return { message: 'Project deleted successfully', data: result };
  }
}
