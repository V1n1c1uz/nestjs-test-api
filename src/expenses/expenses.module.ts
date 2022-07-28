import { Module } from '@nestjs/common';
import { ExpensesService } from './services/expenses.service';
import { ExpensesController } from './controllers/expenses.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, PrismaService],
})
export class ExpensesModule {}
