import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../schemas/user.schema';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto, user: User): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/book.schema").Book> & import("../schemas/book.schema").Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    findAll(user: User): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../schemas/book.schema").Book> & import("../schemas/book.schema").Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(id: string, user: User): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/book.schema").Book> & import("../schemas/book.schema").Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateBookDto: UpdateBookDto, user: User): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/book.schema").Book> & import("../schemas/book.schema").Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string, user: User): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/book.schema").Book> & import("../schemas/book.schema").Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
