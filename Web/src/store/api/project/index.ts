import { httpRequest } from '../httpRequest';
import { orderTypes } from 'models/enums/orderTypes';

const project = {
  getProjectList: (
    order: orderTypes,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) => {
    return httpRequest.post('project/get_all_user_projects', {
      order,
      orderBy,
      page,
      rowsPerPage,
      search,
    });
  },
  getProjectMembers: (
    projectId: string,
    order: orderTypes,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) => {
    return httpRequest.post('project/get_all_project_users_paginated', {
      projectId,
      order,
      orderBy,
      page,
      rowsPerPage,
      search,
    });
  },
  removeMember: (userId: string, projectId: string) => {
    return httpRequest.delete('project/user', {
      data: {
        userId,
        projectId,
      },
    });
  },
  deleteTasks: (projectId: string, taskIdList: string[]) => {
    return httpRequest.delete('project/tasks', {
      data: {
        projectId,
        taskIdList,
      },
    });
  },
  getProjectTaskList: (projectId: string) => {
    return httpRequest.post('project/get_tasks', {
      projectId,
    });
  },
};

export { project };
