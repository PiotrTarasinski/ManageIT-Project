import Controller from '../../shared/controller/Controller';
import SprintMethods from './methods/SprintMethods';
import CustomResponse from '../../error/CustomError';
import SprintFormatter from '../../shared/formatter/SprintFormatter';
import { uuid, twoUUID, sprintChangeTaskState, taskAddUser, sprintUpdateComment, sprintCreate, sprintAddTask } from '../../validation/Validate';
import CommentFormatter from '../../shared/formatter/CommentsFormatter';

class SprintController extends Controller {
  async getSprintTasks() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { sprintId } = this.req.payload;

    const validationResponse = uuid(sprintId, 'sprintId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().getSprintTasks(sprintId);

    if (response) {
      return this.res(await new SprintFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error.' })).code(500);


  }

  async changeTaskState() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { sprintId, taskId, indexFrom, indexTo, stateFrom, stateTo } = this.req.payload;

    const validationResponse = sprintChangeTaskState(sprintId, taskId, indexFrom, indexTo, stateFrom, stateTo);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().changeTaskState(sprintId, taskId, indexFrom, indexTo, stateFrom, stateTo);

    return this.res(response).code(response.statusCode);
  }

  async removeTaskFromSprint() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId, sprintId } = this.req.payload;

    const validationResponse = twoUUID(taskId, sprintId, 'taskId', 'sprintId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().removeTaskFromSprint(taskId, sprintId);

    return this.res(response).code(response.statusCode);
  }

  async addTaskUser() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId, sprintId, userId, type, remove } = this.req.payload;

    const validationResponse = taskAddUser(taskId, sprintId, userId, type, remove);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().addUserToTask(taskId, sprintId, userId, type, remove);

    return this.res(response).code(response.statusCode);
  }


  async addTaskToSprint() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { sprintId, tasks } = this.req.payload;

    const validationResponse = sprintAddTask(sprintId, tasks);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }


    const response = await new SprintMethods().addTaskToSprint(sprintId, tasks);

    if (response) {
      return this.res(await new SprintFormatter().format(response));
    }
    return CustomResponse(404, 'No such sprint.', { formError: 'Sprint not found.' });
  }


  async createSprint() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId, description, name, start, end, tasks } = this.req.payload;

    const validationResponse = sprintCreate(projectId, description, name, start, end, tasks);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().createSprint(projectId, description, name, start, end, tasks);

    if (response) {
      return this.res(await new SprintFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t create sprint.', { formError: 'Database error.' })).code(500);
  }



}

export default SprintController;
