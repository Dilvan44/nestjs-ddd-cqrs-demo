import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './persistence/user.repository';
import { UserService } from './user.service';
import { CommandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UserRepository, UserService, ...CommandHandlers],
  exports: [],
})
export class UserModule {}
