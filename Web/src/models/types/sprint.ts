import { ITask } from './task';

export interface ISprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  taskList: {
    toDoList: ITask[];
    inProgressList: ITask[];
    toReviewList: ITask[];
    doneList: ITask[];
  };
}
