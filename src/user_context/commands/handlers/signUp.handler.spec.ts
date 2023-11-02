import { Test } from '@nestjs/testing';
import { SignUpHandler } from './signUp.handler';
import { SignUpCommand } from '../signUp.command';
import { UserRepository } from '../../persistence/user.repository';
import { userMockRepository } from '../../persistence/user-mock.repository';
import { faker } from '@faker-js/faker';

describe('Sign Up Command Handling', () => {
  let signUpHandler: SignUpHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignUpHandler,
        {
          provide: UserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    signUpHandler = moduleRef.get<SignUpHandler>(SignUpHandler);
  });

  it('should create a new user and return it with an Id', async () => {
    const fakeMail = faker.internet.email();
    const newUser = await signUpHandler.execute(
      new SignUpCommand({ email: fakeMail }),
    );
    expect(newUser.id).toBeDefined();
    expect(newUser.email).toBe(fakeMail);
  });
});
