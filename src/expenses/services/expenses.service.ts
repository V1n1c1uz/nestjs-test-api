import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { PrismaService } from 'src/database/PrismaService';
import { UserDto } from 'src/users/dto/create-user.dto';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailerService,
  ) {}

  async create(user: UserDto, expenseData: CreateExpenseDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    const expenseDate = new Date(expenseData.date);

    if (!userExists) throw new NotFoundException('This user does not exist');
    if (expenseDate > new Date()) {
      throw new BadRequestException('Date is not future');
    }
    if (expenseData.value < 0) {
      throw new BadRequestException('The expense amount cannot be negative');
    }

    const expense = await this.prisma.expense.create({
      data: {
        ...expenseData,
        date: expenseDate,
        userId: user.id,
      },
    });

    await this.mailService.sendMail({
      to: userExists.email,
      from: 'Expense App <expense@app.com.br>',
      subject: 'Despesa Cadastrada',
      text: `Despesa ${expense.description} cadastrada com sucesso ${userExists.username}`,
    });

    return expense;
  }

  async findAll(user: UserDto) {
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId: user.id,
      },
    });
    return {
      data: expenses,
    };
  }

  async findOne(user: UserDto, id: string) {
    const expenseExists = await this.prisma.expense.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!expenseExists) {
      throw new NotFoundException('This expense does not exist');
    }

    return expenseExists;
  }

  async update(user: UserDto, id: string, updateExpenseData: UpdateExpenseDto) {
    const expenseExists = await this.prisma.expense.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!expenseExists) {
      throw new NotFoundException('This expense does not exist');
    }

    const expense = await this.prisma.expense.update({
      data: updateExpenseData,
      where: {
        id,
      },
    });

    return expense;
  }

  async remove(user: UserDto, id: string) {
    const userExists = await this.prisma.expense.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!userExists) throw new NotFoundException('This expense does not exist');

    await this.prisma.expense.delete({
      where: {
        id,
      },
    });
  }
}
