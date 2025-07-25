import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '../schemas/book.schema';
export declare class BookService {
    private bookModel;
    constructor(bookModel: Model<Book>);
    create(createBookDto: CreateBookDto, userId: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Book> & Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(userId: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, Book> & Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(id: string, userId: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Book> & Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateBookDto: UpdateBookDto, userId: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Book> & Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Book> & Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
