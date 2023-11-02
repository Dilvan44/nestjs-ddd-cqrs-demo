import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { SignUpDto } from './interfaces/signUp.dto';
import { SignUpCommand } from './commands/signUp.command';
import { UserHasSignedUpEvent } from './user_aggregate/events/userHasSignedUp.event';

@Injectable()
export class UserService {
  constructor(
    private commandBus: CommandBus,
    private eventBus: EventBus,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const signedUpUser = await this.commandBus.execute(
      new SignUpCommand(signUpDto),
    );
    this.eventBus.publish(new UserHasSignedUpEvent(signedUpUser));
    return signedUpUser;
  }
}
