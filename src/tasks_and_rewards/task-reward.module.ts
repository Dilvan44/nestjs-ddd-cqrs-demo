import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskListRepository } from './task_aggregate/persistence/taskList.repository';

import { TaskRewardController } from './task-reward.controller';
import { CommandHandlers } from './task_aggregate/commands/handlers';
import { QueryHandlers } from './task_aggregate/queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [TaskRewardController],
  providers: [
    TaskService,
    TaskListRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class TaskRewardModule {}
