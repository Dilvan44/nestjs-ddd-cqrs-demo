import { Injectable } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { TaskCompletedEvent } from '../../tasks_and_rewards/task_aggregate/events/taskCompleted.event';
import { SendWellDoneCommand } from '../commands/sendWellDone.command';

@Injectable()
export class TenTaskCompletedSaga {
  // In Memory Caching for sake of simplicity
  private completedTaskIdsPerUser: Record<string, string[]> = {};

  @Saga()
  taskCompleted = (events$: Observable<any>): Observable<any> => {
    return events$.pipe(
      ofType(TaskCompletedEvent),
      map((event: TaskCompletedEvent) => {
        const userId = event.userId;
        const taskId = event.taskId;

        if (!this.completedTaskIdsPerUser[userId]) {
          this.completedTaskIdsPerUser[userId] = [];
        }
        this.completedTaskIdsPerUser[userId].push(taskId);

        console.log(this.completedTaskIdsPerUser);

        if (this.completedTaskIdsPerUser[userId].length === 10) {
          new SendWellDoneCommand(userId);
        }
      }),
    );
  };
}
