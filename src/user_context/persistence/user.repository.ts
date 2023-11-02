import { ConflictException, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user_aggregate/ports/userRepository.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma_module/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async create(email: string) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('User already exists', {
            // Usually, you would not want to expose the error message to the client.
            // This is just for demonstration purposes
            // in Production we should log the error and return a generic message
            cause: error.meta,
          });
        }
      }
      throw error;
    }
  }
}
