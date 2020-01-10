import Controller from '../../shared/controller/Controller';
import AuthMethods from './methods/AuthMethods';
import { encryption } from '../../../../utils';
import CustomResponse from '../../error/CustomError';
import Token from '../../shared/token/Token';
import { uuid, signUp, login } from '../../validation/Validate';

class AuthController extends Controller {
  async login() {
    const payload = await this.req.payload;

    if (!payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const validationResponse = login(payload); // Custom validation

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode); // Return error if fails
    }

    const user = await new AuthMethods().getUserByEmail(payload.email);

    if (!user) {
      return this.res(CustomResponse(401, "User doesn't exist", { formError: 'Wrong user credentials.' })).code(401);
    }

    const hashedPassword: string = encryption.hash(payload.password);

    if (user.id && user.password === hashedPassword) {

      const token = await new Token().generateTokenForUserInstance(user);

      return this.res(CustomResponse(200, 'Successfully logged in.')).header('access_token', token);
    }

    return this.res(CustomResponse(401, 'Wrong password', { formError: 'Wrong user credentials.' })).code(401);
  }

  async validateToken() {
    return this.res(CustomResponse(200, 'Token OK.'));
  }

  async signUp() {
    const payload = await this.req.payload;

    if (!payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' })).code(400);
    }

    const validationResponse = signUp(payload);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new AuthMethods().createUser(payload);

    return this.res(response).code(response.statusCode);
  }

  async setActiveProject() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' }));
    }

    if (!this.user.id) {
      return this.res(CustomResponse(500, 'Something went wrong during validation.', { formError: 'Internal server error' })).code(500);
    }

    const { projectId } = this.req.payload;

    const validationResponse = uuid(projectId, 'projectId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const authResponse = await new AuthMethods().setActiveProject(this.user.id, projectId);

    if (authResponse.token) {
      return this.res(authResponse.response).code(authResponse.response.statusCode).header('access_token', authResponse.token);
    }

    return this.res(authResponse.response).code(authResponse.response.statusCode);
  }

  async setActiveSprint() {
    if (!this.req.payload) {
      return this.res(CustomResponse(400, 'Payload is required.', { formError: 'Invalid payload input.' }));
    }

    if (!this.user.id) {
      return this.res(CustomResponse(500, 'Something went wrong during validation.', { formError: 'Internal server error' })).code(500);
    }

    const { sprintId } = this.req.payload;

    const validationResponse = uuid(sprintId, 'sprintId');

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const authResponse = await new AuthMethods().setActiveSprint(this.user.id, sprintId);

    if (authResponse.token) {
      return this.res(authResponse.response).code(authResponse.response.statusCode).header('access_token', authResponse.token);
    }

    return this.res(authResponse.response).code(authResponse.response.statusCode);
  }
}

export default AuthController;
