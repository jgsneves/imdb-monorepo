import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user-schema';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

type CreateUserData = Omit<User, 'createdAt' | 'updatedAt' | 'isActive'>;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password, role } = createUserDto;
    const saltRounds = 10;

    const passwordHash = await hash(password, saltRounds);

    const data: CreateUserData = {
      id: uuid(),
      email,
      name,
      role,
      password: passwordHash,
    };

    const result = await this.prisma.user.create({ data });

    return result;
  }

  async findAll() {
    const result = await this.prisma.user.findMany();

    return result;
  }

  async findOne(guid: string) {
    const result = await this.prisma.user.findUnique({ where: { id: guid } });

    return result;
  }

  async findOneByEmail(email: string) {
    const result = await this.prisma.user.findUnique({ where: { email } });

    return result;
  }

  async update(guid: string, updateUserDto: UpdateUserDto) {
    const result = await this.prisma.user.update({
      where: { id: guid },
      data: { ...updateUserDto },
    });

    return result;
  }

  async inactivate(guid: string) {
    const result = await this.prisma.user.update({
      where: { id: guid },
      data: {
        isActive: false,
      },
    });

    return result;
  }
}
