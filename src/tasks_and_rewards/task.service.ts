import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OpenTaskListDto } from './task_aggregate/interfaces/openTaskList.dto';
import { TaskList } from './task_aggregate/entities/taskList.aggRoot';
import { OpenTaskListCommand } from './task_aggregate/commands/openTaskList.command';
import { FindAllTaskListsQuery } from './task_aggregate/queries/findAllTasklists.query';
import { FindAllTaskListsDto } from './task_aggregate/interfaces/findAllTasklists.dto';
import { AddTaskDto } from './task_aggregate/interfaces/addTask.dto';
import { AddTaskCommand } from './task_aggregate/commands/addTask.command';
import { CompleteTaskDto } from './task_aggregate/interfaces/completeTask.dto';
import { CompleteTaskCommand } from './task_aggregate/commands/completeTask.command';

@Injectable()
export class TaskService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  async openTaskList(dto: OpenTaskListDto): Promise<TaskList> {
    return this.commandBus.execute(new OpenTaskListCommand(dto));
  }

  async findAllTaskLists(dto: FindAllTaskListsDto): Promise<TaskList[] | null> {
    return this.queryBus.execute(new FindAllTaskListsQuery(dto));
  }

  async addTask(dto: AddTaskDto): Promise<TaskList> {
    return this.commandBus.execute(new AddTaskCommand(dto));
  }

  async completeTask(dto: CompleteTaskDto): Promise<TaskList> {
    return this.commandBus.execute(new CompleteTaskCommand(dto));
  }
}
