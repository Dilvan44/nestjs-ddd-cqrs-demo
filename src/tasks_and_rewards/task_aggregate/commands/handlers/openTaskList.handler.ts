import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OpenTaskListCommand } from '../openTaskList.command';
import { TaskList } from '../../entities/taskList.aggRoot';
import { TaskListRepository } from '../../persistence/taskList.repository';

@CommandHandler(OpenTaskListCommand)
export class OpenTaskListHandler
  implements ICommandHandler<OpenTaskListCommand>
{
  constructor(private taskListRepository: TaskListRepository) {}

  async execute(command: OpenTaskListCommand): Promise<TaskList> {
    const { dto } = command;
    const taskList = TaskList.open(dto.name, dto.description, dto.userId);
    const openedTasklist = await this.taskListRepository.save(taskList);
    return openedTasklist;
  }
}
