import * as Joi from 'joi';
import * as Hapi from '@hapi/hapi';
import * as Boom from 'boom';
import * as moment from 'moment';
import IPlugin from './interface/IPlugin';
import db from '../database';
import { UserInstance } from '../database/models/User';
import { SessionTokenInstance } from '../database/models/SessionToken';
import ApiError from '../api/error/ApiError';
import { app, env } from '../../config';

type Tokens = {
  accessToken: string
  apiClient: string
  apiToken: string
};

type AuthData = {
  type: 'standard' | 'api' | 'lc',
  timestamp: number,
  tokens: Tokens
};

class TokenValidator implements IPlugin {

  private settings = {
    accessTokenName: 'access_token',
    allowQueryToken: false,
    allowCookieToken: false,
    allowMultipleHeaders: false,
    allowChaining: false,
    tokenType: 'Bearer',
    unauthorizedFunc: Boom.unauthorized
  };

  register(server: Hapi.Server): Promise<void> {
    return new Promise((resolve) => {

      server.auth.scheme(
        'bearer-access-token',
        () => this.validateAuthorizationHeaders()
      );

      server.auth.strategy('simple', 'bearer-access-token');
      server.auth.default('simple');

      resolve();
    });
  }

  validateAuthorizationHeaders() {
    return {
      authenticate: async (request: Hapi.Request, reply: Hapi.ResponseToolkit) => await this.authenticate(request, reply)
    };
  }

  async authenticate(request: Hapi.Request, reply: Hapi.ResponseToolkit) {
    try {
      const authData = await this.getAuthenticationData(request);

      return reply.authenticated(
        await this.validateStandardAccessToken(authData.tokens.accessToken)
      );

    } catch (e) {
      throw ApiError.fallbackError(e);
    }
  }

  validateTimestamp(timestamp: number): boolean {
    const diff = moment().diff(timestamp, 'minutes');

    // diff >= -3 && diff <= 3
    return diff >= (app.api.timestampValidTimeInMinutes * -1) &&
      diff <= app.api.timestampValidTimeInMinutes;
  }

  async getAuthenticationData(request: Hapi.Request): Promise<AuthData> {
    // extract authorization variables
    const {
      authorization = '',
      apiclient = '',
      apitoken = ''
    } = request.raw.req.headers;

    // get timestamp and parse it to number
    const timestamp: number = parseInt(<string>request.raw.req.headers.timestamp, 10) || 0;

    // 401 if there are no auth headers
    if (!authorization && !apiclient && !apitoken) {
      throw ApiError.boom(null, { statusCode: 401 });
    }

    const authData: AuthData = {
      type: 'standard',
      timestamp,
      tokens: {
        accessToken: this.extractTokenFromAuthorizationHeader(authorization),
        apiClient: <string>apiclient,
        apiToken: <string>apitoken
      }
    };

    return authData;
  }

  extractTokenFromAuthorizationHeader(authorization: string): string {
    const parts = authorization.split(/\s+/);

    if (parts[0].toLowerCase() !== this.settings.tokenType.toLowerCase()) {
      return '';
    }

    return parts[1];
  }

  validateUuid(uuid: string) {
    try {
      Joi.attempt(uuid, Joi.string().guid().required());
      return true;
    } catch (err) {
      return false;
    }
  }

  async validateStandardAccessToken(accessToken: string) {
    // validate access token if its correct UUID
    if (!this.validateUuid(accessToken)) {
      throw ApiError.boom(new Error('bad_token'), { statusCode: 401 });
    }

    // get token by id
    const foundToken: SessionTokenInstance | null = await db.SessionToken.findByPk(accessToken);

    // 401 if token not found
    if (!foundToken) {
      throw ApiError.boom(new Error('bad_token'), { statusCode: 401 });
    }

    // get associated user
    const user: UserInstance | null = await foundToken.getUser();

    // 401 if user not found
    if (!user) {
      throw ApiError.boom(new Error('bad_token'), { statusCode: 401 });
    }

    // @ts-ignore types for sequelize do not approve of this syntax,
    // however it is valid by the docs http://docs.sequelizejs.com/class/lib/model.js~Model.html#instance-method-changed
    foundToken.changed('updatedAt', true);

    // return necessary data for controllers
    return {
      credentials: {
        user,
        type: 'standard',
        token: await foundToken.save()
      }
    };
  }
}

export default new TokenValidator();
