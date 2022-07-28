import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  create(@Body() userData: UserDto) {
    return this.usersService.create(userData);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@CurrentUser() id: UserDto, @Body() userData) {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
