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

  async changeEntryState() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { sprintId, entryId, indexFrom, indexTo, stateFrom, stateTo } = this.req.payload;

    const validationResponse = Validate.sprintChangeEntryType(sprintId, entryId, indexFrom, indexTo, stateFrom, stateTo);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().changeEntryState(sprintId, entryId, indexFrom, indexTo, stateFrom, stateTo);

    return this.res(response).code(response.statusCode);
  }
}

export default SprintController;
