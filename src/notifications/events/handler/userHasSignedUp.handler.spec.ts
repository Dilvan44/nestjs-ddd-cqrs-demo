import { Test } from '@nestjs/testing';
import { userFixture } from '../../../user_context/interfaces/user-dto.fixture';
import { UserHasSignedUpEvent } from '../../../user_context/user_aggregate/events/userHasSignedUp.event';
import { UserHasSignedUpHandler } from './userHasSignedUp.handler';
import { IEmailClient } from '../../ports/emailClient.interface';

describe('User has signed Up Event Handler', () => {
  let userHasSignedUpHandler: UserHasSignedUpHandler;
  let emailClient: IEmailClient;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserHasSignedUpHandler,
        {
          provide: 'EmailClient',
          useValue: {
            sendWelcomeEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    userHasSignedUpHandler = moduleRef.get<UserHasSignedUpHandler>(
      UserHasSignedUpHandler,
    );
    emailClient = moduleRef.get('EmailClient');
  });

  it('should send a welcome email to the user', async () => {
    const fakeUser = userFixture;
    await userHasSignedUpHandler.handle(new UserHasSignedUpEvent(fakeUser));

    expect(emailClient.sendWelcomeEmail).toHaveBeenCalledWith(fakeUser.email);
  });
});
