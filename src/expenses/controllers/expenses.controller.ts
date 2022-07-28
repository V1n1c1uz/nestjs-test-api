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

import { ExpensesService } from '../services/expenses.service';

import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { UserDto } from 'src/users/dto/create-user.dto';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@CurrentUser() user: UserDto, @Body() expenseData: CreateExpenseDto) {
    return this.expensesService.create(user, expenseData);
  }

  @Get()
  findAll(@CurrentUser() user: UserDto) {
    return this.expensesService.findAll(user);
  }

  @Get(':id')
  findOne(@CurrentUser() user: UserDto, @Param('id') id: string) {
    return this.expensesService.findOne(user, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: UserDto,
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(user, id, updateExpenseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@CurrentUser() user: UserDto, @Param('id') id: string) {
    return this.expensesService.remove(user, id);
  }
}
