import { taskState, taskType } from 'models/enums/task';
import { IPerson } from './person';

export interface ITask {
  id: string;
  title: string;
  state: taskState;
  type: taskType;
  index: number;
  points: number;
  labels: ITaskLabel[];
  assing: IPerson[];
  revievers: IPerson[];
}

export interface ITaskLabel {
  id: string;
  name: string;
  color: string;
}
