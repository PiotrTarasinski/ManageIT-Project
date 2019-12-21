import Controller from '../../shared/controller/Controller';
import db from '../../../database';
import ProjectMethods from './methods/ProjectMethods';
import CustomResponse from '../../error/CustomError';
import UserProjectFormatter from '../../shared/formatter/UserProjectFormatter';
import Validate from '../../validation/Validate';

class ProjectController extends Controller {
  async getUserProjects() {
    if (!this.user.id) {
      return this.res(CustomResponse(500, 'Something went wrong during validation.', { formError: 'Internal server error' }));
    }
    const userProjects = await new ProjectMethods().getUserProjects(this.user.id);

    if (!userProjects) {
      return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error' }));
    }

    return this.res(await new UserProjectFormatter().format(userProjects));
  }

  async addUserToProject() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' }));
    }

    const { userId, projectId } = this.req.payload;

    const validationResponse = Validate.addUserToProject(userId, projectId);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    if (!this.user.id) {
      return this.res(CustomResponse(500, 'Something went wrong during validation.', { formError: 'Internal server error' }));
    }

    const response = await new ProjectMethods().addUserToProject(userId, projectId);

    return this.res(response).code(response.statusCode);
  }
}

export default ProjectController;
