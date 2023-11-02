import { AddTaskDto } from '../interfaces/addTask.dto';

export class AddTaskCommand {
  constructor(readonly dto: AddTaskDto) {}
}
