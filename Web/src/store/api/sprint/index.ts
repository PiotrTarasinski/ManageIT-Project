import { httpRequest } from '../httpRequest';
import { taskState } from 'models/enums/task';

const sprint = {
  getSprint: (id: string) => {
    return httpRequest.post('sprint/get_entries', {
      id,
    });
  },

  moveTask: (
    sprintId: string,
    entryId: string,
    indexFrom: number,
    indexTo: number,
    stateFrom: taskState,
    stateTo: taskState,
  ) => {
    return httpRequest.post('sprint/change_state', {
      sprintId,
      entryId,
      indexFrom,
      indexTo,
      stateFrom,
      stateTo,
    });
  },
};

export { sprint };
