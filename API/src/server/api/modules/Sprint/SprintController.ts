import Controller from '../../shared/controller/Controller';
import db from '../../../database';
import SprintMethods from './methods/SprintMethods';
import CustomResponse from '../../error/CustomError';
import SprintFormatter from '../../shared/formatter/SprintFormatter';
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
      if (response.activeSprint) {
        return this.res(await new SprintFormatter().format(response));
      }
      return this.res(CustomResponse(400, 'No active sprint.', { formError: 'There is no active sprint.' })).code(400);
    }

    return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error.' })).code(500);


  }

  async changeEntryType() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { sprintId, entryId, indexFrom, indexTo, typeFrom, typeTo } = this.req.payload;

    const validationResponse = Validate.sprintChangeEntryType(sprintId, entryId, indexFrom, indexTo, typeFrom, typeTo);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().changeEntryType(sprintId, entryId, indexFrom, indexTo, typeFrom, typeTo);

    if (response) {
      return this.res(response);
    }

    return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error.' })).code(500);
  }
}

export default SprintController;
