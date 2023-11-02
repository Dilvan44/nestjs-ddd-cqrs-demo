import { faker } from '@faker-js/faker';
import { UserDto } from './user.dto';

export const userFixture: UserDto = {
  email: faker.internet.email(),
  id: faker.string.uuid(),
};
