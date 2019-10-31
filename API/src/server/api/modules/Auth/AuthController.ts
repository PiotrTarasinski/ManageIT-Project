import * as httpStatus from 'http-status';
import Controller from '../../shared/controller/Controller';
import ApiError from '../../error/ApiError';
import AuthFormatter from './formatters/AuthFormatter';
import AuthMethods from './methods/AuthMethods';
import { encryption } from '../../../../utils';
import Validator from '../../validation/Validators';
import validate from '../../validation/Validate';

class AuthController extends Controller {
  async login() {
    const { email, password } = this.req.payload;

    const user = await new AuthMethods().getUserByEmail(email);

    if (!user) {
      throw ApiError.boom(null, { message: 'Unauthorized', statusCode: httpStatus.UNAUTHORIZED });
    }

    const hashedPassword: string = encryption.hash(password);

    if (user.id && user.password === hashedPassword) {

      await new AuthMethods().findAndDeleteToken(user.id);

      const token = await new AuthMethods().createNewSessionTokenForUser(user, this.req.headers);

      const formattedUser = await new AuthFormatter().format(user);

      return this.res(formattedUser).header('access_token', <string>token.id);
    }

    throw ApiError.boom(null, { statusCode: 401 });
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

  async test() {
    const payload = await this.req.payload;

    const temp = [Validator.isEmail(payload.email, 'email'), Validator.required(payload.email, 'email')];
    // temp.push(Validator.isEmail(payload.email, 'email'));
    // temp.push(Validator.isString(payload.email, 'email'));

    console.log(temp);

    return this.res(payload);
  }
}

export default AuthController;
