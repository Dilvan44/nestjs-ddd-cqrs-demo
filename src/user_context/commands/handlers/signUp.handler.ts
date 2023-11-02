import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from '../signUp.command';
import { UserRepository } from '../../../user_context/persistence/user.repository';
import { User } from '@prisma/client';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: SignUpCommand): Promise<User> {
    const user = await this.userRepository.create(command.dto.email);
    return user;
  }
}
