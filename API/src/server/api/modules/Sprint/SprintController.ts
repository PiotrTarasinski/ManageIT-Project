import Controller from '../../shared/controller/Controller';
import db from '../../../database';
import SprintMethods from './methods/SprintMethods';
import CustomResponse from '../../error/CustomError';
import Validate from '../../validation/Validate';

class SprintController extends Controller {
  async getSprintEntries() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { id } = this.req.payload;

    const validationResponse = Validate.getSprintEntries(id);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().getSprintEntries(id);

    if (response) {
      return this.res(response);
    }

    return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error.' })).code(500);


  }
}

export default SprintController;
