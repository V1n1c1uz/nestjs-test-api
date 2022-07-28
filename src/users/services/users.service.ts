import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/database/PrismaService';

import { UserDto } from '../dto/create-user.dto';

import { HashProvider } from '@providers/hashProvider/hash.provider';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private hashProvider: HashProvider,
  ) {}

  async create(userData: UserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (userExists) throw new ForbiddenException('Email unavailable.');

    const hashedPassword = await this.hashProvider.generateHash(
      userData.password,
    );

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    delete user.password;

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return {
      data: users.map((user) => {
        delete user.password;
        return {
          ...user,
        };
      }),
    };
  }

  async findOne(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) throw new NotFoundException('This user does not exist');

    return userExists;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(requestUser: UserDto, userData: UserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: requestUser.id,
      },
    });

    if (!userExists) throw new NotFoundException('This user does not exist');

    const user = await this.prisma.user.update({
      data: userData,
      where: {
        id: requestUser.id,
      },
    });

    delete user.password;

    return user;
  }

  async remove(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) throw new NotFoundException('This user does not exist');

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
