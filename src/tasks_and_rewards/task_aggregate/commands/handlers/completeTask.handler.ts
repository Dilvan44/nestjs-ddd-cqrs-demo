import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CompleteTaskCommand } from '../completeTask.command';
import { TaskListRepository } from '../../persistence/taskList.repository';
import { TaskList } from '../../entities/taskList.aggRoot';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TaskCompletedEvent } from '../../events/taskCompleted.event';

@CommandHandler(CompleteTaskCommand)
export class CompleteTaskHandler
  implements ICommandHandler<CompleteTaskCommand>
{
  constructor(
    private readonly taskListRepository: TaskListRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CompleteTaskCommand): Promise<TaskList> {
    const taskList = await this.taskListRepository.findByTaskId(
      command.dto.taskId,
    );

    if (!taskList) throw new NotFoundException('Tasklist not found');

    try {
      taskList.completeTask(command.dto.taskId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const updatedTaskList = this.taskListRepository.save({
      id: taskList.id,
      tasks: taskList.tasks,
    });
    this.eventBus.publish(
      new TaskCompletedEvent(command.dto.taskId, taskList.userId),
    );
    return updatedTaskList;
  }
}
