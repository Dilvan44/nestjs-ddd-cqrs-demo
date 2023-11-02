import { User } from '@prisma/client';

// As this aggregate does not have a domain model, we'll use the Prisma model directly.
// Usually, you would create a domain model and map the Prisma model to it. So that the domain logic does not know about the persistence layer.
export type IUserRepository = {
  create: (email: string) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
};
