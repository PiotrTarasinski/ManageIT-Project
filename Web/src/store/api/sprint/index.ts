import { httpRequest } from '../httpRequest';
import { taskState, assignType } from 'models/enums/task';

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
  addTasksToSprint: (sprintId: string, tasks: string[]) => {
    return httpRequest.post('sprint/add_task', {
      sprintId,
      tasks,
    });
  },
  removeTasksFromSprint: (sprintId: string, tasks: string[]) => {
    return httpRequest.delete('sprint/tasks', {
      data: {
        sprintId,
        tasks,
      },
    });
  },
  assigToTask: (
    taskId: string,
    sprintId: string,
    userId: string,
    type: assignType,
    remove: boolean,
  ) => {
    return httpRequest.post('sprint/add_user', {
      taskId,
      sprintId,
      userId,
      type,
      remove,
    });
  },
};

export { sprint };
