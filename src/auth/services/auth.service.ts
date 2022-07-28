import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/services/users.service';

import { User } from 'src/users/entities/user.entity';

import { HashProvider } from '@providers/hashProvider/hash.provider';
import { JwtProvider } from '@providers/jwtProvider/JwtProvider';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private hashProvider: HashProvider,
    private jwtProvider: JwtProvider,
  ) {}

  async login(user: User) {
    const jwtToken = await this.jwtProvider.generateToken(user);
    return {
      ...user,
      token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const compare = await this.hashProvider.compareHash(
        password,
        user.password,
      );

      delete user.password;

      if (compare) {
        return user;
      }
    }

    throw new UnauthorizedException('Email address or incorrect password');
  }
}
