import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';

import { AuthController } from './controllers/auth.controller';

import { AuthService } from './services/auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';

import { HashProvider } from '@providers/hashProvider/hash.provider';
import { JwtProvider } from '@providers/jwtProvider/JwtProvider';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    HashProvider,
    JwtProvider,
    JwtStrategy,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
