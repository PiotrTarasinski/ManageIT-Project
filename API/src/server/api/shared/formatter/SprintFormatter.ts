import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { SprintInstance } from '../../../database/models/Sprint';
import { TaskInstance } from '../../../database/models/Task';
import bulkFormat from '../../../../utils/bulkFormat';
import TaskFormatter, { TaskResponseFormat } from './TaskFormatter';

export type SprintResponseFormat = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  taskList?: {
    toDoList: TaskResponseFormat[];
    inProgressList: TaskResponseFormat[];
    toReviewList: TaskResponseFormat[];
    doneList: TaskResponseFormat[];
  }
};

class SprintFormatter implements ResponseFormatter<SprintInstance, SprintResponseFormat> {
  async format(sprint: SprintInstance) {
    const toDoList: TaskInstance[] = [];
    const inProgressList: TaskInstance[] = [];
    const toReviewList: TaskInstance[] = [];
    const doneList: TaskInstance[] = [];
    (sprint.tasks as TaskInstance[]).forEach(async entry => {
      if (entry.state && entry.state === 'To do') {
        toDoList.push(entry);
      } else if (entry.state && entry.state === 'In progress') {
        inProgressList.push(entry);
      } else if (entry.state && entry.state === 'To review / test') {
        toReviewList.push(entry);
      } else {
        doneList.push(entry);
      }
    });
    return {
      id: <string>sprint.id,
      name: sprint.name,
      description: sprint.description,
      startDate: new Date(sprint.start),
      endDate: new Date(sprint.end),
      taskList: {
        toDoList: await bulkFormat(new TaskFormatter(), toDoList),
        inProgressList: await bulkFormat(new TaskFormatter(), inProgressList),
        toReviewList: await bulkFormat(new TaskFormatter(), toReviewList),
        doneList: await bulkFormat(new TaskFormatter(), doneList)
      }
    };
  }
}

export default SprintFormatter;
