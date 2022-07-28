import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { PrismaService } from 'src/database/PrismaService';

import { UsersController } from './controllers/users.controller';

import { HashProvider } from '@providers/hashProvider/hash.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, HashProvider],
  exports: [UsersService],
})
export class UsersModule {}
