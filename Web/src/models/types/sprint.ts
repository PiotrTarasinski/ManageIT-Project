import { ITask } from './task';

export interface ISprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  taskList: {
    toDoList: ITask[];
    inProgressList: ITask[];
    toReviewList: ITask[];
    doneList: ITask[];
  };
}
