import Controller from '../../shared/controller/Controller';
import TaskMethods from './methods/TaskMethods';
import CustomResponse from '../../error/CustomError';
import { taskCreate, taskUpdate, sprintCreateComment, sprintUpdateComment, uuid } from '../../validation/Validate';
import CommentFormatter from '../../shared/formatter/CommentsFormatter';
import TaskFormatter from '../../shared/formatter/TaskFormatter';

class TaskController extends Controller {

  async createTask() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { points, priority, type, title, description, projectId, projectName } = this.req.payload;

    const validationResponse = taskCreate(points, priority, type, title, description, projectId, projectName);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new TaskMethods().createTask(
      points,
      priority,
      type,
      title,
      description,
      projectId,
      projectName,
      this.user.name,
      <string>this.user.id
      );

    if (response) {
      return this.res(await new TaskFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t create sprint task.', { formError: 'Database error.' })).code(500);
  }


  async updateTask() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId, points, priority, type, title, description, labels } = this.req.payload;

    const validationResponse = taskUpdate(taskId, points, priority, type, title, description, labels);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new TaskMethods().updateTask(
      taskId,
      points,
      priority,
      type,
      title,
      description,
      labels,
      this.user.name,
      <string>this.user.id
      );

    if (response) {
      return this.res(await new TaskFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t update task.', { formError: 'Database error.' })).code(500);
  }

  async deleteTask() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId } = this.req.payload;

    const validationResponse = uuid(taskId, 'taskId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new TaskMethods().deleteTask(taskId, this.user.name, <string>this.user.id);

    return this.res(response).code(response.statusCode);
  }


  async createComment() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { taskId, content } = this.req.payload;

    const validationResponse = sprintCreateComment(taskId, content);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new TaskMethods().createComment(taskId, <string>this.user.id, content);

    if (response) {
      return this.res(await new CommentFormatter().format(response));
    }
    return this.res(CustomResponse(500, 'Couldn\'t add comment.', { formError: 'Database error.' })).code(500);
  }


  async updateComment() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { commentId, content } = this.req.payload;

    const validationResponse = sprintUpdateComment(commentId, content);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new TaskMethods().updateComment(commentId, content);

    if (response) {
      return this.res(await new CommentFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t update comment.', { formError: 'Database error.' })).code(500);
  }


  async deleteComment() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { commentId } = this.req.payload;

    const validationResponse = uuid(commentId, 'commentId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new TaskMethods().deleteComment(commentId);

    return this.res(response).code(response.statusCode);
  }
}

export default TaskController;
