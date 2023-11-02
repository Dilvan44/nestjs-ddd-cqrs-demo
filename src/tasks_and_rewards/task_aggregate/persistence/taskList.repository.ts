import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma_module/prisma.service';
import { ITasklistRepository } from '../ports/taskListRepository.interface';
import { TaskList } from '../entities/taskList.aggRoot';
import { Tasklist as TasklistDB, Task as TaskDB, User } from '@prisma/client';
import { TaskItem } from '../entities/taskItem.entity';

@Injectable()
export class TaskListRepository implements ITasklistRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain = (tasklist: TasklistDB, tasks: TaskDB[]): TaskList => {
    const { id, name, description, createdAt, userId } = tasklist;
    return new TaskList(
      id,
      name,
      description,
      createdAt,
      userId,
      tasks.map((task) => {
        return new TaskItem(
          task.id,
          task.name,
          task.completed,
          task.completedAt,
        );
      }),
    );
  };

  public async save(tasklist: Partial<TaskList>): Promise<TaskList> {
    const { name, description, createdAt, tasks, userId, id } = tasklist;
    let user: User | undefined = undefined;
    if (userId) {
      const userSearchResult = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userSearchResult) {
        throw new Error('User not found');
      }
      user = userSearchResult;
    }

    const savedTaskList = await this.prisma.tasklist.upsert({
      where: {
        // If an id is provided it will set it, otherwise it will use id 0 which does not exist so it will create a new record.
        id: id || '0',
      },
      update: {
        name,
        description,
        createdAt,
        userId: user?.id,
      },
      create: {
        name: name || '',
        description,
        createdAt,
        userId: user?.id || '',
      },
      include: {
        tasks: true,
      },
    });

    if (tasks) {
      const savedTasks: TaskDB[] = [];
      for (const task of tasks) {
        const savedTask = await this.prisma.task.upsert({
          where: {
            id: task.id || '0',
          },
          update: {
            name: task.name,
            completed: task.completed,
            completedAt: task.completedAt,
            listId: savedTaskList.id,
          },
          create: {
            name: task.name,
            completed: task.completed,
            completedAt: task.completedAt,
            listId: savedTaskList.id,
          },
        });
        savedTasks.push(savedTask);
      }
      return this.toDomain(savedTaskList, savedTasks);
      // Would be beautiful to do it like this but sqlite does not support concurrent calls.
      // const tasksToSave = tasks?.map(async (task) => {
      //   return this.prisma.task.upsert({
      //     where: {
      //       id: task.id || '0',
      //     },
      //     update: {
      //       name: task.name,
      //       completed: task.completed,
      //       completedAt: task.completedAt,
      //       listId: savedTaskList.id,
      //     },
      //     create: {
      //       name: task.name,
      //       completed: task.completed,
      //       completedAt: task.completedAt,
      //       listId: savedTaskList.id,
      //     },
      //   });
      // });

      // const savedTasks = await Promise.all(tasksToSave);
      // return this.toDomain(savedTaskList, savedTasks);
    }

    return this.toDomain(savedTaskList, []);
  }

  // We can decide on which syntax we want to use for the function declaration.
  // I prefer the one below but it's up to you.
  findAllByUser = async (userId: string) => {
    const tasklists = await this.prisma.tasklist.findMany({
      where: {
        userId: userId,
      },
      include: {
        tasks: true,
      },
    });
    if (tasklists.length === 0) {
      return null;
    }

    return tasklists.map((tasklist) => {
      return this.toDomain(tasklist, tasklist.tasks);
    });
  };

  findById = async (id: string) => {
    const tasklist = await this.prisma.tasklist.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: true,
        User: true,
      },
    });

    if (!tasklist) {
      return null;
    }

    return this.toDomain(tasklist, tasklist.tasks);
  };

  findByTaskId = async (taskId: string) => {
    const tasklist = await this.prisma.tasklist.findFirst({
      where: {
        tasks: {
          some: {
            id: taskId,
          },
        },
      },
      include: {
        tasks: true,
        User: true,
      },
    });

    if (!tasklist) {
      return null;
    }

    return this.toDomain(tasklist, tasklist.tasks);
  };
}
