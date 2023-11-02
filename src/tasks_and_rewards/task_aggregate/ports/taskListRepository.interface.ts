import { TaskList } from '../entities/taskList.aggRoot';

export type ITasklistRepository = {
  save: (tasklist: TaskList) => Promise<TaskList>;
  findAllByUser: (userId: string) => Promise<TaskList[] | null>;
  findById: (id: string) => Promise<TaskList | null>;
  findByTaskId: (taskId: string) => Promise<TaskList | null>;
};
