import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { PrismaService } from '../../prisma_module/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Prisma, PrismaClient } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

describe('User Repository', () => {
  let userRepository: UserRepository;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaClient>(),
        },
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    prismaService = moduleRef.get(PrismaService);
  });

  it('should create a new user', async () => {
    const email = 'test@experial.ai';
    prismaService.user.create.mockResolvedValueOnce({
      id: 'test-id',
      email: email,
    });
    const user = await userRepository.create(email);
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
  });

  it('should find a user by email', async () => {
    const email = 'test@experial.ai';
    prismaService.user.findUnique.mockResolvedValueOnce({
      id: 'test-id',
      email: email,
    });
    const user = await userRepository.findByEmail(email);
    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
  });

  it('should throw an conflict error if user already exists', async () => {
    const email = 'already@signedup.io';
    jest.spyOn(prismaService.user, 'create').mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Mocked error', {
        code: 'P2002',
        clientVersion: 'mocked-client-version',
      }),
    );
    try {
      await userRepository.create(email);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    }
  });
});
