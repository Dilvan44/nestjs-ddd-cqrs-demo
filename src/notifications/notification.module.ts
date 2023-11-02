import { Module } from '@nestjs/common';
import { EmailClientMailify } from './adapters/emailClientMailify.adapter';
import { EventHandlers } from './events/handler';
import { TenTaskCompletedSaga } from './sagas/tenTaskCompleted.saga';
import { CommandHandlers } from './commands/handler';

@Module({
  providers: [
    {
      provide: 'EmailClient',
      useClass: EmailClientMailify,
    },
    ...EventHandlers,
    ...CommandHandlers,
    TenTaskCompletedSaga,
  ],
})
export class NotificationsModule {}
