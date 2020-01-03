import Controller from '../../shared/controller/Controller';
import db from '../../../database';
import SprintMethods from './methods/SprintMethods';
import CustomResponse from '../../error/CustomError';
import SprintFormatter from '../../shared/formatter/SprintFormatter';
import Validate from '../../validation/Validate';
import { SprintInstance } from '../../../database/models/Sprint';
import ProjectEntriesFormatter from '../../shared/formatter/ProjectEntriesFormatter';

class SprintController extends Controller {
  async getSprintEntries() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { id } = this.req.payload;

    const validationResponse = Validate.getSprintEntries(id, 'id');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().getSprintEntries(id);

    if (response) {
      return this.res(await new SprintFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Database error.', { formError: 'Internal server error.' })).code(500);


  }

  async getProjectEntries() {

    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { id } = this.req.payload;

    const validationResponse = Validate.getSprintEntries(id, 'id');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().getProjectEntries(id);

    if (response) {
      return this.res(await new ProjectEntriesFormatter().format(response));
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

  async deleteEntry() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { id } = this.req.payload;

    const validationResponse = Validate.sprintDeleteEntry(id);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().deleteEntry(id);

    if (response) {
      return this.res(CustomResponse(200, 'Successfully deleted sprint entry.'));
    }

    return this.res(CustomResponse(500, 'Couldn\'t delete sprint entry', { formError: 'Database error.' })).code(500);
  }

  async createEntry() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { points, priority, state, type, title, description, projectId, projectName } = this.req.payload;

    const validationResponse = Validate.sprintCreateEntry(points, priority, state, type, title, description, projectId, projectName);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().createEntry(points, priority, state, type, title, description, projectId, projectName);

    if (response) {
      return this.res(CustomResponse(200, 'Sprint entry created successfully.'));
    }

    return this.res(CustomResponse(500, 'Couldn\'t create sprint entry', { formError: 'Database error.' })).code(500);
  }

  async addEntryUser() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { id, userId, type } = this.req.payload;

    const validationResponse = Validate.sprintAddEntryUser(id, userId, type);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().addUserToEntry(id, userId, type);

    return this.res(response).code(response.statusCode);
  }

  async removeEntryUser() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { id, userId, type } = this.req.payload;

    const validationResponse = Validate.sprintAddEntryUser(id, userId, type);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().removeUserFromEntry(id, userId, type);

    return this.res(response).code(response.statusCode);
  }

  async updateEntry() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { id, points, priority, type, title, description } = this.req.payload;

    const validationResponse = Validate.sprintUpdateEntry(id, points, priority, type, title, description);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new SprintMethods().updateEntry(id, points, priority, type, title, description);

    return this.res(response).code(response.statusCode);
  }

  async addEntryToSprint() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { id, sprintId } = this.req.payload;

    const response = await new SprintMethods().addEntryToSprint(id, sprintId);

    return this.res(response).code(response.statusCode);
  }

  async removeEntryFromSprint() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { id } = this.req.payload;

    const response = await new SprintMethods().removeEntryFromSprint(id);

    return this.res(response).code(response.statusCode);
  }
}

export default SprintController;
