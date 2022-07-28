import { IsEmail, IsString } from 'class-validator';

export interface IUserFromJwt {
  id: string;
}
export interface IUserPayload {
  id: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

export class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
