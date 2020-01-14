import { httpRequest } from '../httpRequest';
import { taskState } from 'models/enums/task';

const sprint = {
  getSprint: (sprintId: string) => {
    return httpRequest.post('sprint/get_tasks', {
      sprintId,
    });
  },
  moveTask: (
    sprintId: string,
    taskId: string,
    indexFrom: number,
    indexTo: number,
    stateFrom: taskState,
    stateTo: taskState,
  ) => {
    return httpRequest.post('sprint/change_state', {
      sprintId,
      taskId,
      indexFrom,
      indexTo,
      stateFrom,
      stateTo,
    });
  },
  addTasksToSprint: (sprintId: string, taskIdList: string[]) => {
    return httpRequest.post('sprint/add_task', {
      sprintId,
      taskIdList,
    });
  },
};

export { sprint };
