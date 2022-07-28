import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRequest } from 'src/@types/express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { IsPublic } from '../decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Request() request: AuthRequest) {
    return this.authService.login(request.user);
  }
}
