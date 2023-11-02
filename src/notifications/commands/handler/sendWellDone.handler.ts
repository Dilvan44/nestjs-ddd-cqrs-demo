import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendWellDoneCommand } from '../sendWellDone.command';
import { Inject } from '@nestjs/common';
import { IEmailClient } from '../../ports/emailClient.interface';

@CommandHandler(SendWellDoneCommand)
export class SendWellDoneHandler
  implements ICommandHandler<SendWellDoneCommand>
{
  constructor(
    @Inject('EmailClient') private readonly emailClient: IEmailClient,
  ) {}

  async execute(command: SendWellDoneCommand): Promise<void> {
    await this.emailClient.sendWellDoneEmail(command.userMail);
  }
}
