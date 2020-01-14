import Controller from '../../shared/controller/Controller';
import ProjectMethods from './methods/ProjectMethods';
import CustomResponse from '../../error/CustomError';
import UserProjectFormatter from '../../shared/formatter/UserProjectFormatter';
import ProjectUsersFormatter from '../../shared/formatter/ProjectUsersFormatter';
import bulkFormat from '../../../../utils/bulkFormat';
import RoleLabelFormatter from '../../shared/formatter/RoleLabelFormatter';
import { userGetProjects, twoUUID, uuid, projectGetUsers, projectCreate, projectUpdate, sprintAddTask, projectUpdateUser } from '../../validation/Validate';
import TaskFormatter from '../../shared/formatter/TaskFormatter';
import UserFormatter from '../../shared/formatter/UserFormatter';

class ProjectController extends Controller {
  async getUserProjects() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { order, orderBy, page, rowsPerPage, search } = this.req.payload;

    const validationResponse = userGetProjects(order, orderBy, page, rowsPerPage, search);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const userProjects = await new ProjectMethods().getUserProjects(<string>this.user.id, order, orderBy, page, rowsPerPage, search);

    if (!userProjects) {
      return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error' })).code(500);
    }

    if (userProjects.rows.length === 0) {
      return this.res(userProjects);
    }

    return this.res(await new UserProjectFormatter().format(userProjects));
  }

  async addUserToProject() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { userId, projectId } = this.req.payload;

    const validationResponse = twoUUID(userId, projectId, 'userId', 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new ProjectMethods().addUserToProject(userId, projectId, this.user.name, <string>this.user.id);

    return this.res(response).code(response.statusCode);
  }

  async deleteUserFromProject() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' }));
    }

    const { userId, projectId } = this.req.payload;

    const validationResponse = twoUUID(userId, projectId, 'userId', 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new ProjectMethods().deleteUserFromProject(userId, projectId, this.user.name, <string>this.user.id);

    return this.res(response).code(response.statusCode);
  }

  async getProjectUsers() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' }));
    }

    const { projectId } = this.req.payload;

    const validationResponse = uuid(projectId, 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const projectUsers = await new ProjectMethods().getProjectUsers(projectId);

    if (!projectUsers) {
      return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error' }));
    }

    if (projectUsers.rows.length === 0) {
      return this.res(projectUsers);
    }

    return this.res(await new ProjectUsersFormatter().format(projectUsers));
  }

  async getProjectUsersPaginated() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' }));
    }

    const { projectId, order, orderBy, page, rowsPerPage, search } = this.req.payload;

    const validationResponse = projectGetUsers(projectId, order, orderBy, page, rowsPerPage, search);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const projectUsers = await new ProjectMethods().getProjectUsersPaginated(projectId, order, orderBy, page, rowsPerPage, search);

    if (!projectUsers) {
      return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error' }));
    }

    if (projectUsers.rows.length === 0) {
      return this.res(projectUsers);
    }
    return this.res(await new ProjectUsersFormatter().format(projectUsers));
  }

  async createProject() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { name, state } = this.req.payload;

    const validationResponse = projectCreate(name, state);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new ProjectMethods().createProject(name, state, <string>this.user.id, this.user.name, <string>this.user.id);

    if (response) {
      return this.res(response);
    }

    return this.res(CustomResponse(500, 'Database error.', { formError: 'Database error.' })).code(500);
  }

  async deleteProject() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId } = this.req.payload;

    const validationResponse = uuid(projectId, 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new ProjectMethods().deleteProject(projectId);

    return this.res(response).code(response.statusCode);
  }

  async updateProject() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId, name, state, leadId } = this.req.payload;

    const validationResponse = projectUpdate(projectId, name, state, leadId);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new ProjectMethods().updateProject(projectId, name, state, leadId, this.user.name, <string>this.user.id);

    return this.res(response).code(response.statusCode);
  }

  async getProjectTasks() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId } = this.req.payload;

    const validationResponse = uuid(projectId, 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new ProjectMethods().getProjectTasks(projectId);

    if (response) {
      return this.res({ activeSprintId: response.activeSprintId, taskList: await bulkFormat(new TaskFormatter(), response.tasks) });
    }

    return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error.' })).code(500);
  }

  async getProjectRoles() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId } = this.req.payload;

    const validationResponse = uuid(projectId, 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new ProjectMethods().getProjectRoles(projectId);

    if (response) {
      return this.res(await bulkFormat(new RoleLabelFormatter(), response));
    }

    return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error.' })).code(500);
  }

  async deleteTasks () {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId, tasks } = this.req.payload;

    const validationResponse = sprintAddTask(projectId, tasks);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new ProjectMethods().deleteTasks(projectId, tasks, this.user.name, <string>this.user.id);

    return this.res(response).code(response.statusCode);
  }

  async updateProjectUser() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { userId, projectId, permissions, roles } = this.req.payload;

    const validationResponse = projectUpdateUser(userId, projectId, permissions, roles);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new ProjectMethods().updateProjectUser(userId, projectId, permissions, roles);

    if (response) {
      return this.res(await new UserFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t update user.', { formError: 'Database error.' })).code(500);
  }
}

export default ProjectController;
