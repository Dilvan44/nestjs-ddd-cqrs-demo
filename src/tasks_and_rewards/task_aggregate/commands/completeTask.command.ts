import { CompleteTaskDto } from '../interfaces/completeTask.dto';

export class CompleteTaskCommand {
  constructor(public readonly dto: CompleteTaskDto) {}
}
