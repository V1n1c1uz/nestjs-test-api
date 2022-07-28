import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  id?: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
