import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { OpenTaskListDto } from './task_aggregate/interfaces/openTaskList.dto';
import { TaskList } from './task_aggregate/entities/taskList.aggRoot';
import { FindAllTaskListsDto } from './task_aggregate/interfaces/findAllTasklists.dto';
import { AddTaskDto } from './task_aggregate/interfaces/addTask.dto';
import { CompleteTaskDto } from './task_aggregate/interfaces/completeTask.dto';

@Controller('task-reward')
export class TaskRewardController {
  constructor(
    private readonly taskService: TaskService, // private readonly rewardService: RewardService,
  ) {}

  @Post('open-task-list')
  public async openTaskList(@Body() dto: OpenTaskListDto): Promise<TaskList> {
    return this.taskService.openTaskList(dto);
  }

  @Get('find-all-task-lists/:userId')
  public async findAllTaskLists(
    @Param() dto: FindAllTaskListsDto,
  ): Promise<TaskList[] | null> {
    return this.taskService.findAllTaskLists(dto);
  }

  @Post('add-task')
  public async addTask(@Body() dto: AddTaskDto): Promise<TaskList> {
    return this.taskService.addTask(dto);
  }

  @Patch('complete-task')
  public async completeTask(@Body() dto: CompleteTaskDto): Promise<TaskList> {
    return this.taskService.completeTask(dto);
  }
}
