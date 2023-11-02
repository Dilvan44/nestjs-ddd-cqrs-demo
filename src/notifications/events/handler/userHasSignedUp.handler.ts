import { Inject, Injectable } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { UserHasSignedUpEvent } from '../../../user_context/user_aggregate/events/userHasSignedUp.event';
import { IEmailClient } from '../../ports/emailClient.interface';

@Injectable()
export class UserHasSignedUpHandler
  implements IEventHandler<UserHasSignedUpEvent>
{
  constructor(
    @Inject('EmailClient') private readonly emailClient: IEmailClient,
  ) {}

  async handle(event: UserHasSignedUpEvent) {
    await this.emailClient.sendWelcomeEmail(event.dto.email);
  }
}
