import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SignUpDto } from '../src/user_context/interfaces/signUp.dto';
import { PrismaService } from '../src/prisma_module/prisma.service';
import { IEmailClient } from '../src/notifications/ports/emailClient.interface';
import { NotificationsModule } from '../src/notifications/notification.module';

// Remember to seed the database before running the e2e tests.

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let emailClient: IEmailClient;

  const mockEmailClient: IEmailClient = {
    sendWelcomeEmail: jest.fn(),
    sendWellDoneEmail: jest.fn(),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, NotificationsModule],
    })
      .overrideProvider('EmailClient')
      .useValue(mockEmailClient)
      .compile();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    app = moduleFixture.createNestApplication();
    emailClient = moduleFixture.get<IEmailClient>('EmailClient');
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // For the sake of simplicity I'll add all e2e tests here and split them via describe blocks.
  // In real life you should split them into separate files and folders.
  describe('User Context', () => {
    afterEach(async () => {
      // Clean up the database after each test.
      // It might also be an option to clean up the database before the tests via the seed script.
      // This would make the tests less dependent on prisma.
      try {
        const test = await prisma.user.delete({
          where: {
            email: 'new@user.ai',
          },
        });
        console.log(test);
      } catch (error) {}
    });

    it('should Sign up a user and send a notification', () => {
      const inputDto: SignUpDto = {
        email: 'new@user.ai',
      };
      return request(app.getHttpServer())
        .post('/user/signup')
        .send(inputDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.email).toEqual(inputDto.email);
          expect(res.body.id).toBeDefined();
          expect(emailClient.sendWelcomeEmail).toBeCalledTimes(1);
        });
      // .expect(() => {
      //   expect(emailClient.sendWelcomeEmail).toBeCalledTimes(1);
      // });
    });
    it('should throw an conflict error if the user already exists', () => {
      const inputDto: SignUpDto = {
        // See seed.ts for the email address that is used here.
        email: 'test@experial.ai',
      };
      return request(app.getHttpServer())
        .post('/user/signup')
        .send(inputDto)
        .expect(409);
    });
  });
});
