import { OpenTaskListDto } from '../interfaces/openTaskList.dto';

export class OpenTaskListCommand {
  constructor(public readonly dto: OpenTaskListDto) {}
}
