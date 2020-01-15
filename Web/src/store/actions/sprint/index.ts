import { Dispatch } from 'redux';
import { Action, SprintState, AppState } from 'models/types/store';
import { handleError } from 'utils/handleError';
import { API } from 'store/api';
import { sprintActionTypes } from 'models/enums/storeActions';
import { taskState, assignType } from 'models/enums/task';
import { ThunkDispatch } from 'redux-thunk';
import { ITaskList, ITask } from 'models/types/task';
import { reordedTaskList } from 'utils/reordedTaskList';
import { IPerson } from 'models/types/person';
import { displaySnackbar, setSelectedTask } from '../application';

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

const assigToTask = (
  task: ITask,
  sprintId: string,
  user: IPerson,
  type: assignType,
  remove: boolean,
) => (dispatch: ThunkDispatch<AppState, any, Action>) => {
  return API.sprint
    .assigToTask(task.id, sprintId, user.id, type, remove)
    .then((res: any) => {
      let updatedTask: ITask = { ...task };
      if (type === assignType.ASSIGN) {
        !remove
          ? updatedTask.assign.push(user)
          : (updatedTask.assign = updatedTask.assign.filter(assign => {
              return assign.id !== user.id;
            }));
      } else if (type === assignType.REVIEW) {
        !remove
          ? updatedTask.reviewers.push(user)
          : (updatedTask.reviewers = updatedTask.reviewers.filter(reviewer => {
              return reviewer.id !== user.id;
            }));
      }
      dispatch(setSelectedTask(updatedTask));
      dispatch(getSprint(sprintId));
      dispatch(
        displaySnackbar({
          text: `Successfully ${remove ? 'unassigned' : 'assigned'} ${user.name} to ${
            task.identifier
          }`,
          variant: 'success',
        }),
      );
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

export { getSprint, moveTask, setSprint, assigToTask };
