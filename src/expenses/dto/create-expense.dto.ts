import { IsDateString, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateExpenseDto {
  id?: string;

  @IsString()
  @MaxLength(191)
  description: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  value: number;
}
