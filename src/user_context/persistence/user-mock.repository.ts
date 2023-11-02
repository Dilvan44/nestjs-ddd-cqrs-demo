import { IUserRepository } from '../user_aggregate/ports/userRepository.interface';

export const userMockRepository: IUserRepository = {
  create: async (email: string) => {
    return Promise.resolve({
      id: '123',
      email,
    });
  },
  findByEmail(email) {
    return Promise.resolve({
      id: '123',
      email,
    });
  },
};
