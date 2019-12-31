import { taskState, taskType, taskPriority } from 'models/enums/task';
import { IPerson } from './person';

export interface ITask {
  id: string;
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
  revievers: IPerson[];
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
