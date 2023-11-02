import { AggregateRoot } from '@nestjs/cqrs';
import { TaskItem } from './taskItem.entity';
import { AddTaskDto } from '../interfaces/addTask.dto';

export class TaskList extends AggregateRoot {
  // Couldve used private fields here but for the sake of simplicity I dont want to introduce getters
  constructor(
    public id: string | null,
    public readonly name: string,
    public readonly description: string | null,
    public readonly createdAt: Date,
    public readonly userId: string,
    public readonly tasks: TaskItem[],
  ) {
    super();
  }

  public static open(
    name: string,
    description: string,
    userId: string,
  ): TaskList {
    return new TaskList(null, name, description, new Date(), userId, []);
  }

  // here could be more methods like updateName, updateDescription, etc. but as this is just a demo I'll keep it simple.
  // I only add the functionality to add tasks to the task list. The business rule is there should not be more than 5 tasks in a task list.
  public addTask(dto: AddTaskDto): void {
    if (this.tasks.length >= 5) {
      throw new Error('A task list cannot have more than 5 tasks');
    }
    const task = TaskItem.add(dto.name);
    this.tasks.push(task);
  }

  public setId(id: string): void {
    this.id = id;
  }

  public completeTask(taskId: string): void {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) throw new Error('Task not found');
    task.complete();
  }
}
