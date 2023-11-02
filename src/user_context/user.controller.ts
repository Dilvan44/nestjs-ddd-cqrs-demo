import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './interfaces/signUp.dto';
import { UserService } from './user.service';
import { ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDto } from './interfaces/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'User signed up', type: UserDto })
  @ApiConflictResponse({ description: 'User already exists' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.userService.signUp(signUpDto);
  }
}
