import { Dispatch } from 'redux';
import { Action, SprintState, AppState } from 'models/types/store';
import { handleError } from 'utils/handleError';
import { API } from 'store/api';
import { sprintActionTypes } from 'models/enums/storeActions';
import { taskState } from 'models/enums/task';
import { ThunkDispatch } from 'redux-thunk';
import { ITaskList } from 'models/types/task';
import { reordedTaskList } from 'utils/reordedTaskList';

const setSprint = (sprint: SprintState) => ({
  type: sprintActionTypes.SET_SPRINT,
  payload: sprint,
});

const updateTaskList = (taskList: ITaskList) => ({
  type: sprintActionTypes.UPDATE_TASK_LIST,
  payload: taskList,
});

const getSprint = (id: string) => (dispatch: Dispatch<Action>) => {
  return API.sprint
    .getSprint(id)
    .then((res: any) => {
      dispatch(
        setSprint({
          ...res.data,
          startDate: new Date(res.data.startDate),
          endDate: new Date(res.data.endDate),
        }),
      );
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const moveTask = (
  taskList: ITaskList,
  sprintId: string,
  entryId: string,
  indexFrom: number,
  indexTo: number,
  stateFrom: taskState,
  stateTo: taskState,
) => (dispatch: ThunkDispatch<AppState, any, Action>) => {
  dispatch(updateTaskList(reordedTaskList(taskList, indexFrom, indexTo, stateFrom, stateTo)));
  return API.sprint
    .moveTask(sprintId, entryId, indexFrom, indexTo, stateFrom, stateTo)
    .then((res: any) => {
      dispatch(getSprint(sprintId));
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

export { getSprint, moveTask };
