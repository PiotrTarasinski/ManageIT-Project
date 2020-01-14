import Controller from '../../shared/controller/Controller';
import CustomResponse from '../../error/CustomError';
import { uuid, labelCreate, labelUpdate } from '../../validation/Validate';
import LabelMethods from './methods/LabelMethods';
import LabelFormatter from '../../shared/formatter/LabelFormatter';
import bulkFormat from '../../../../utils/bulkFormat';
import RoleLabelFormatter from '../../shared/formatter/RoleLabelFormatter';


class TaskController extends Controller {

  async getProjectLabels() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId } = this.req.payload;

    const validationResponse = uuid(projectId, 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new LabelMethods().getProjectLabels(projectId);

    if (response) {
      return this.res({ labels: await bulkFormat(new LabelFormatter(), response) });
    }

    return this.res(response);
  }

  async getProjectRoles() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId } = this.req.payload;

    const validationResponse = uuid(projectId, 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new LabelMethods().getProjectRoles(projectId);

    if (response) {
      return this.res({ roles: await bulkFormat(new RoleLabelFormatter(), response) });
    }

    return this.res(response);
  }

  async createProjectLabel() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId, name, color } = this.req.payload;

    const validationResponse = labelCreate(projectId, name, color);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new LabelMethods().createProjectLabel(projectId, name, color);

    if (response) {
      return this.res(await new LabelFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t create label.', { formError: 'Database error.' })).code(500);
  }

  async createProjectRole() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { projectId, name, color } = this.req.payload;

    const validationResponse = labelCreate(projectId, name, color);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new LabelMethods().createProjectRole(projectId, name, color);

    if (response) {
      return this.res(await new RoleLabelFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t create role.', { formError: 'Database error.' })).code(500);
  }

  async updateProjectLabel() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { labelId, name, color } = this.req.payload;

    const validationResponse = labelUpdate(labelId, name, color);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new LabelMethods().updateProjectLabel(labelId, name, color);

    if (response) {
      return this.res(await new LabelFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t update label.', { formError: 'Database error.' })).code(500);
  }

  async updateProjectRole() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { labelId, name, color } = this.req.payload;

    const validationResponse = labelUpdate(labelId, name, color);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new LabelMethods().updateProjectRole(labelId, name, color);

    if (response) {
      return this.res(await new RoleLabelFormatter().format(response));
    }

    return this.res(CustomResponse(500, 'Couldn\'t update role.', { formError: 'Database error.' })).code(500);
  }

  async deleteProjectLabel() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { labelId } = this.req.payload;

    const validationResponse = uuid(labelId, 'labelId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new LabelMethods().deleteProjectLabel(labelId);

    return this.res(response).code(response.statusCode);
  }

  async deleteProjectRole() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const { labelId } = this.req.payload;

    const validationResponse = uuid(labelId, 'labelId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new LabelMethods().deleteProjectRole(labelId);

    return this.res(response).code(response.statusCode);
  }
}

export default TaskController;
