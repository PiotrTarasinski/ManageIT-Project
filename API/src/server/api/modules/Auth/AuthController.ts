import * as httpStatus from 'http-status';
import Controller from '../../shared/controller/Controller';
import ApiError from '../../error/ApiError';
import AuthFormatter from './formatters/AuthFormatter';
import AuthMethods from './methods/AuthMethods';
import { encryption } from '../../../../utils';


class AuthController extends Controller {

  async login() {
    const { email, password } = this.req.payload;

    const user = await new AuthMethods().getUserByEmail(email);

    if (!user) {
      throw ApiError.boom(null, { message: 'Unauthorized', statusCode: httpStatus.UNAUTHORIZED });
    }

    const hashedPassword: string = encryption.hash(password);

    if (user.id && user.password === hashedPassword) {

      const token = await new AuthMethods().createNewSessionTokenForUser(user, this.req.headers);

      const formattedUser = await new AuthFormatter().format(user);

      return this.res(formattedUser)
        .header('access_token', <string>token.id);
    }

    throw ApiError.boom(null, { statusCode: 401 });
  }

  async validateToken() {
    const token: string = this.token ? <string>this.token.id : '';

    if (this.user && this.user.id) {
      const formattedUser = await new AuthFormatter().format(this.user);

      return this.res(formattedUser)
        .header('access_token', token);
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
    const { payload } = this.req;
    const methods = new AuthMethods();

    const user = await methods.createUser(payload);

    const formattedUser = await new AuthFormatter().format(user);

    return this.res(formattedUser);
  }

}


export default AuthController;
