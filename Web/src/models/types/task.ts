import { taskState, taskType, taskPriority } from 'models/enums/task';
import { IPerson } from './person';

export interface ITask {
  id: string;
  identifier: string;
  title: string;
  description?: string;
  comments: IComment[];
  state: taskState;
  type: taskType;
  index: number;
  points: number;
  priority: taskPriority;
  labels: ITaskLabel[];
  assign: IPerson[];
  reviewers: IPerson[];
}

export interface ITaskLabel {
  id: string;
  name: string;
  color: string;
}

export interface IComment {
  id: string;
  author: IPerson;
  message: string;
}

export interface ITaskList {
  toDoList: ITask[];
  inProgressList: ITask[];
  toReviewList: ITask[];
  doneList: ITask[];
}
