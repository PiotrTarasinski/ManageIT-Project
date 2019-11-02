import Controller from '../../shared/controller/Controller';
import AuthFormatter from './formatters/AuthFormatter';
import AuthMethods from './methods/AuthMethods';
import { encryption } from '../../../../utils';
import validate from '../../validation/Validate';
import CustomResponse from '../../error/CustomError';

class AuthController extends Controller {
  async login() {
    const payload = await this.req.payload;

    const validationResponse = validate.login(payload); // Custom validation

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.code); // Return error if fails
    }

    const user = await new AuthMethods().getUserByEmail(payload.email);

    if (!user) {
      return this.res(CustomResponse(401, "User doesn't exist", { formError: 'Wrong user credemtials.' }));
    }

    const hashedPassword: string = encryption.hash(payload.password);

    if (user.id && user.password === hashedPassword) {
      await new AuthMethods().findAndDeleteToken(user.id);

      const token = await new AuthMethods().createNewSessionTokenForUser(user, this.req.headers);

      const formattedUser = await new AuthFormatter().format(user);

      return this.res(formattedUser).header('access_token', <string>token.id);
    }

    return this.res(CustomResponse(401, 'Wrong password', { formError: 'Wrong user credemtials.' }));
  }

  async validateToken() {
    const token: string = this.token ? <string>this.token.id : '';

    if (this.user && this.user.id) {
      const formattedUser = await new AuthFormatter().format(this.user);

      return this.res(formattedUser).header('access_token', token);
    }

    return this.res().header('access_token', token);
  }

  async logout() {
    try {
      await this.token.destroy();

      return this.res();
    } catch (e) {
      return this.res();
    }
  }

  async signUp() {
    const payload = await this.req.payload;

    const validationResponse = validate.signUp(payload);

    if (validationResponse.errors) {
      return this.res(validationResponse).code(validationResponse.code);
    }

    const response = await new AuthMethods().createUser(payload);

    return this.res(response).code(response.code);
  }
}

export default AuthController;
