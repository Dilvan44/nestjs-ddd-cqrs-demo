import { AddTaskHandler } from './addTask.handler';
import { CompleteTaskHandler } from './completeTask.handler';
import { OpenTaskListHandler } from './openTaskList.handler';

export const CommandHandlers = [
  OpenTaskListHandler,
  AddTaskHandler,
  CompleteTaskHandler,
];
