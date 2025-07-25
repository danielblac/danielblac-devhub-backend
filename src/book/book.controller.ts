import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../schemas/user.schema';

@UseGuards(JwtGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto, @GetUser() user: User) {
    return this.bookService.create(createBookDto, user._id.toString());
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.bookService.findAll(user._id.toString());
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.bookService.findOne(id, user._id.toString());
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @GetUser() user: User,
  ) {
    return this.bookService.update(id, updateBookDto, user._id.toString());
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.bookService.remove(id, user._id.toString());
  }
}
