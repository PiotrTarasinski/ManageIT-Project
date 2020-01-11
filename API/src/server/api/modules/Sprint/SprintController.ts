import Controller from '../../shared/controller/Controller';
import SprintMethods from './methods/SprintMethods';
import CustomResponse from '../../error/CustomError';
import SprintFormatter from '../../shared/formatter/SprintFormatter';
import { uuid, twoUUID, sprintChangeTaskState, taskAddUser, taskUpdate, sprintAddComment, sprintUpdateComment } from '../../validation/Validate';
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

  async deleteTaskFromSpint() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId } = this.req.payload;

    const validationResponse = uuid(taskId, 'taskId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().deleteTaskFromSprint(taskId);

    if (response) {
      return this.res(CustomResponse(200, 'Successfully deleted sprint task.'));
    }

    return this.res(CustomResponse(500, 'Couldn\'t delete sprint task.', { formError: 'Database error.' })).code(500);
  }

  async addTaskUser() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId, userId, type } = this.req.payload;

    const validationResponse = taskAddUser(taskId, userId, type);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().addUserToTask(taskId, userId, type);

    return this.res(response).code(response.statusCode);
  }

  async removeTaskUser() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId, userId, type } = this.req.payload;

    const validationResponse = taskAddUser(taskId, userId, type);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().removeUserFromTask(taskId, userId, type);

    return this.res(response).code(response.statusCode);
  }

  async updateTask() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId, points, priority, type, title, description } = this.req.payload;

    const validationResponse = taskUpdate(taskId, points, priority, type, title, description);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().updateTask(taskId, points, priority, type, title, description);

    return this.res(response).code(response.statusCode);
  }

  async addTaskToSprint() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId, sprintId } = this.req.payload;

    const validationResponse = twoUUID(taskId, sprintId, 'taskId', 'sprintId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().addTaskToSprint(taskId, sprintId);

    return this.res(response).code(response.statusCode);
  }

  async removeTaskFromSprint() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId } = this.req.payload;

    const validationResponse = uuid(taskId, 'taskId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().removeTaskFromSprint(taskId);

    return this.res(response).code(response.statusCode);
  }

  async addComment() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    if (!this.user.id) {
      return this.res(CustomResponse(500, 'Something went wrong during validation.', { formError: 'Internal server error. ' })).code(500);
    }

    const { taskId, content } = this.req.payload;

    const validationResponse = sprintAddComment(taskId, content);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().addComment(taskId, this.user.id, content);

    if (response) {
      return this.res(await new CommentFormatter().format(response));
    }
    return this.res(CustomResponse(500, 'Couldn\'t add comment.', { formError: 'Database error.' })).code(500);
  }

  async deleteComment() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    if (!this.user.id) {
      return this.res(CustomResponse(500, 'Something went wrong during validation.', { formError: 'Internal server error. ' })).code(500);
    }

    const { commentId } = this.req.payload;

    const validationResponse = uuid(commentId, 'commentId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().deleteComment(commentId);

    return this.res(response).code(response.statusCode);
  }

  async updateComment() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    if (!this.user.id) {
      return this.res(CustomResponse(500, 'Something went wrong during validation.', { formError: 'Internal server error. ' })).code(500);
    }

    const { commentId, content } = this.req.payload;

    const validationResponse = sprintUpdateComment(commentId, content);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().updateComment(commentId, content);

    if (response) {
      return this.res(await new CommentFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t update comment.', { formError: 'Database error.' })).code(500);
  }
}

export default SprintController;
