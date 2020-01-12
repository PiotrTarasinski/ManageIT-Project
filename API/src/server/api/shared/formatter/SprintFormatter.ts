import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { SprintInstance } from '../../../database/models/Sprint';
import bulkFormat from '../../../../utils/bulkFormat';
import { TaskResponseFormat } from './TaskFormatter';
import { TaskSprintInstance } from '../../../database/models/TaskSprint';
import TaskSprintFormatter from './TaskSprintFormatter';

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
    const toDoList: TaskSprintInstance[] = [];
    const inProgressList: TaskSprintInstance[] = [];
    const toReviewList: TaskSprintInstance[] = [];
    const doneList: TaskSprintInstance[] = [];
    (sprint.taskList as TaskSprintInstance[]).forEach(async task => {
      if (task.state && task.state === 'To do') {
        toDoList.push(task);
      } else if (task.state && task.state === 'In progress') {
        inProgressList.push(task);
      } else if (task.state && task.state === 'To review / test') {
        toReviewList.push(task);
      } else {
        doneList.push(task);
      }
    });
    return {
      id: <string>sprint.id,
      name: sprint.name,
      description: sprint.description,
      startDate: new Date(sprint.start),
      endDate: new Date(sprint.end),
      taskList: {
        toDoList: await bulkFormat(new TaskSprintFormatter(), toDoList),
        inProgressList: await bulkFormat(new TaskSprintFormatter(), inProgressList),
        toReviewList: await bulkFormat(new TaskSprintFormatter(), toReviewList),
        doneList: await bulkFormat(new TaskSprintFormatter(), doneList)
      }
    };
  }
}

export default SprintFormatter;
