// As we don't have a domain entity for this bounded context, we need to create an annotated DTO for the response.
// Also as this bounded context uses the prisma entity directly, we need the DTO to conform to the prisma entity.

import { User } from '@prisma/client';
import { IsEmail, IsUUID } from 'class-validator';

export class UserDto implements User {
  @IsEmail()
  email: string;

  @IsUUID()
  id: string;
}
