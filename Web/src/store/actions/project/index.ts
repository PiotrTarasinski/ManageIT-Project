import { Dispatch } from 'redux';
import { Action } from 'models/types/store';
import Swal from 'sweetalert2';
import { displaySnackbar } from '../application';
import { handleError } from 'utils/handleError';
import { API } from 'store/api';
import { ProjectsListData } from 'models/types/project';
import { projectActionTypes } from 'models/enums/storeActions';
import { orderTypes } from 'models/enums/orderTypes';

const setProjectList = (projectList: ProjectsListData, projectListCount: number) => ({
  type: projectActionTypes.SET_PROJECT_LIST,
  payload: { projectList, projectListCount },
});

const setProjectMembers = (projectMemberList: any, projectMemberCount: number) => ({
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
  }).then(result => {
    if (result.value) {
      dispatch(displaySnackbar({ text: `Successfully left project ${name}`, variant: 'success' }));
    }
  });
};

const handleDeleteProject = (id: string, name: string) => (dispatch: Dispatch<Action>) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Please confirm that you want to delete the project`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
  }).then(result => {
    if (result.value) {
      dispatch(
        displaySnackbar({ text: `Successfully removed project ${name}`, variant: 'success' }),
      );
    }
  });
};

export { handleLeaveProject, handleDeleteProject, getProjectList, getProjectMembers };
