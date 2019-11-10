import Controller from '../../shared/controller/Controller';
import AuthMethods from './methods/AuthMethods';
import { encryption } from '../../../../utils';
import validate from '../../validation/Validate';
import CustomResponse from '../../error/CustomError';
import Token from '../../shared/token/Token';
import AuthFormatter from '../../shared/formatter/UserFormatter';

class AuthController extends Controller {
  async login() {
    const payload = await this.req.payload;

    const validationResponse = validate.login(payload); // Custom validation

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
    return this.res(CustomResponse(200, 'Token OK.')).code(200);
  }

  async signUp() {
    const payload = await this.req.payload;

    const validationResponse = validate.signUp(payload);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.statusCode);
    }

    const response = await new AuthMethods().createUser(payload);

    return this.res(response).code(response.statusCode);
  }
}

export default AuthController;
