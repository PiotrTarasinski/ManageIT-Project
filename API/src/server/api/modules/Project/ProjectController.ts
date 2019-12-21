import Controller from '../../shared/controller/Controller';
import db from '../../../database';
import ProjectMethods from './methods/ProjectMethods';
import CustomResponse from '../../error/CustomError';
import UserProjectFormatter from '../../shared/formatter/UserProjectFormatter';

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
}

export default ProjectController;
