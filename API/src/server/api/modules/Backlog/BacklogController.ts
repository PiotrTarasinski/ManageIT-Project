import Controller from '../../shared/controller/Controller';
import CustomResponse from '../../error/CustomError';
import BacklogMethods from './Methods/BacklogMethods';
import { uuid } from '../../validation/Validate';
import BacklogFormatter from '../../shared/formatter/BacklogFormatter';
import BacklogsFormatter from '../../shared/formatter/BacklogsFormatter';

class BacklogController extends Controller {
  async getProjectBacklog() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' }));
    }

    const { projectId } = this.req.payload;

    const validationResponse = uuid(projectId, 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new BacklogMethods().getProjectBacklog(projectId);

    if (response) {
      return this.res(await new BacklogsFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t get log list.', { formError: 'Database error.' })).code(500);
  }
}

export default BacklogController;
