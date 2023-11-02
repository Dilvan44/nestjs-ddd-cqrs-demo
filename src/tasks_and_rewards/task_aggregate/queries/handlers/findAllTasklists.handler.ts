import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllTaskListsQuery } from '../findAllTasklists.query';
import { TaskListRepository } from '../../persistence/taskList.repository';
import { TaskList } from '../../entities/taskList.aggRoot';

@QueryHandler(FindAllTaskListsQuery)
export class FindAllTaskListsHandler
  implements IQueryHandler<FindAllTaskListsQuery>
{
  constructor(private readonly taskListRepository: TaskListRepository) {}

  async execute(query: FindAllTaskListsQuery): Promise<TaskList[] | null> {
    return this.taskListRepository.findAllByUser(query.dto.userId);
  }
}
