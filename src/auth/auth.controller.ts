import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - username already exists',
  })
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid credentials',
  })
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
