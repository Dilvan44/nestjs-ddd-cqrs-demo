import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { faker } from '@faker-js/faker';
import { UserHasSignedUpEvent } from './user_aggregate/events/userHasSignedUp.event';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('User Service', () => {
  let userService: UserService;
  let commandBus: DeepMockProxy<CommandBus>;
  let eventBus: DeepMockProxy<EventBus>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CommandBus,
          useValue: mockDeep<CommandBus>(),
        },
        {
          provide: EventBus,
          useValue: mockDeep<EventBus>(),
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    commandBus = moduleRef.get(CommandBus);
    eventBus = moduleRef.get(EventBus);
  });

  it('should emmit a user signed up event when the user was successfully signed up', async () => {
    const fakeMail = faker.internet.email();
    const fakeUUID = faker.string.uuid();
    let publishedEvent: UserHasSignedUpEvent | undefined = undefined;

    // probably it would make sense to have one user fixture for every test, so that if the user model
    // changes the test still works
    commandBus.execute.mockResolvedValue({ id: fakeUUID, email: fakeMail });

    eventBus.publish.mockImplementation((event: UserHasSignedUpEvent) => {
      publishedEvent = event;
    });

    await userService.signUp({ email: fakeMail });

    expect(publishedEvent).toBeDefined();
    expect(publishedEvent!.dto.id).toBe(fakeUUID);
    expect(publishedEvent!.dto?.email).toBe(fakeMail);
  });
});
