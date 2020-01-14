import { Dispatch } from 'redux';
import { Action, AppState } from 'models/types/store';
import Swal from 'sweetalert2';
import { displaySnackbar } from '../application';
import { handleError } from 'utils/handleError';
import { API } from 'store/api';
import { ProjectsListData } from 'models/types/project';
import { projectActionTypes } from 'models/enums/storeActions';
import { orderTypes } from 'models/enums/orderTypes';
import { IPerson } from 'models/types/person';
import { ThunkDispatch } from 'redux-thunk';
import { ITask } from 'models/types/task';
import { getSprint, setSprint } from '../sprint';

const setProjectList = (projectList: ProjectsListData, projectListCount: number) => ({
  type: projectActionTypes.SET_PROJECT_LIST,
  payload: { projectList, projectListCount },
});

const setProjectTaskList = (projectTaskList: ITask[]) => ({
  type: projectActionTypes.SET_PROJECT_TASK_LIST,
  payload: { projectTaskList },
});

const setProjectMembers = (projectMemberList: IPerson[], projectMemberCount: number) => ({
  type: projectActionTypes.SET_PROJECT_MEMBER_LIST,
  payload: { projectMemberList, projectMemberCount },
});

const getProjectList = (
  order: orderTypes,
  orderBy: string,
  page: number,
  rowsPerPage: number,
  search: string,
) => (dispatch: Dispatch<Action>) => {
  return API.project
    .getProjectList(order, orderBy, page, rowsPerPage, search)
    .then((res: any) => {
      dispatch(setProjectList(res.data.projects, res.data.count));
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const getProjectTaskList = (projectId: string) => (
  dispatch: ThunkDispatch<AppState, any, Action>,
) => {
  return API.project
    .getProjectTaskList(projectId)
    .then((res: any) => {
      const { taskList, activeSprintId } = res.data;
      dispatch(setProjectTaskList(taskList));
      if (activeSprintId) {
        dispatch(getSprint(activeSprintId));
      } else {
        dispatch(
          setSprint({
            id: '',
            name: '',
            description: '',
            taskList: {
              toDoList: [],
              inProgressList: [],
              toReviewList: [],
              doneList: [],
            },
            startDate: new Date(),
            endDate: new Date(),
          }),
        );
      }
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const addTasksToSprint = (projectId: string, sprintId: string, taskIdList: string[]) => (
  dispatch: ThunkDispatch<AppState, any, Action>,
) => {
  return API.sprint
    .addTasksToSprint(sprintId, taskIdList)
    .then((res: any) => {
      dispatch(getProjectTaskList(projectId));
      dispatch(
        displaySnackbar({
          text: `Successfully added ${taskIdList.length > 1 ? 'tasks' : 'task'} to sprint`,
          variant: 'success',
        }),
      );
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const deleteTasks = (projectId: string, taskIdList: string[]) => (
  dispatch: ThunkDispatch<AppState, any, Action>,
) => {
  return API.project
    .deleteTasks(projectId, taskIdList)
    .then((res: any) => {
      dispatch(getProjectTaskList(projectId));
      dispatch(
        displaySnackbar({
          text: `Successfully removed ${taskIdList.length > 1 ? 'tasks' : 'task'}`,
          variant: 'success',
        }),
      );
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const getProjectMembers = (
  projectId: string,
  order: orderTypes,
  orderBy: string,
  page: number,
  rowsPerPage: number,
  search: string,
) => (dispatch: Dispatch<Action>) => {
  return API.project
    .getProjectMembers(projectId, order, orderBy, page, rowsPerPage, search)
    .then((res: any) => {
      dispatch(setProjectMembers(res.data.users, res.data.count));
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const handleLeaveProject = (id: string, name: string) => (dispatch: Dispatch<Action>) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Please confirm that you want to leave the project`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
  })
    .then(result => {
      if (result.value) {
        dispatch(
          displaySnackbar({ text: `Successfully left project ${name}`, variant: 'success' }),
        );
      }
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const handleDeleteProject = (id: string, name: string) => (dispatch: Dispatch<Action>) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Please confirm that you want to delete the project`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
  })
    .then(result => {
      if (result.value) {
        dispatch(
          displaySnackbar({ text: `Successfully removed project ${name}`, variant: 'success' }),
        );
      }
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const handleRemoveMember = (
  projectId: string,
  member: IPerson,
  order: orderTypes,
  orderBy: string,
  page: number,
  rowsPerPage: number,
  search: string,
) => (dispatch: ThunkDispatch<AppState, any, Action>) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Please confirm that you want to remove ${member.name} from the project`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
  }).then(result => {
    if (result.value) {
      return API.project
        .removeMember(member.id, projectId)
        .then((res: any) => {
          dispatch(getProjectMembers(projectId, order, orderBy, page, rowsPerPage, search));
          dispatch(
            displaySnackbar({
              text: `Successfully removed ${member.name} from the project`,
              variant: 'success',
            }),
          );
        })
        .catch((err: any) => {
          return handleError(err)(dispatch);
        });
    }
  });
};

export {
  handleLeaveProject,
  handleDeleteProject,
  getProjectList,
  getProjectTaskList,
  getProjectMembers,
  handleRemoveMember,
  addTasksToSprint,
  deleteTasks,
};
