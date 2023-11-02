import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskListRepository } from '../../persistence/taskList.repository';
import { AddTaskCommand } from '../addTask.command';
import { TaskList } from '../../entities/taskList.aggRoot';
import { ConflictException, NotFoundException } from '@nestjs/common';

@CommandHandler(AddTaskCommand)
export class AddTaskHandler implements ICommandHandler<AddTaskCommand> {
  constructor(private readonly taskListRepository: TaskListRepository) {}

  async execute(command: AddTaskCommand): Promise<TaskList> {
    const taskList = await this.taskListRepository.findById(
      command.dto.tasklistId,
    );

    if (!taskList) throw new NotFoundException('Tasklist not found');
    try {
      taskList.addTask(command.dto);
    } catch (error) {
      throw new ConflictException(error.message);
    }

    return this.taskListRepository.save({
      id: taskList.id,
      tasks: taskList.tasks,
    });
  }
}
