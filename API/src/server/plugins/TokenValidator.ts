import * as Hapi from '@hapi/hapi';
import * as Boom from 'boom';
import IPlugin from './interface/IPlugin';
import db from '../database';
import { UserInstance } from '../database/models/User';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';


type TokenResponse = {
  data?: UserInstance;
  code?: number;
  message?: string;
};

type UserData = {
  message?: string;
  user?: UserInstance;
  code?: number;
};

class TokenValidator implements IPlugin {

  register(server: Hapi.Server): Promise<void> {
    return new Promise(resolve => {
      server.auth.scheme('bearer-access-token', () => this.validateAuthorizationHeaders());

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
    const token = request.headers.authorization;
    if (!token) {
      return reply.unauthenticated(Boom.unauthorized('No token supplied in request.')); // If token validation fails
    }

    const authData = await this.decodeToken(token);
    if (authData.data) {
      const authUser = await this.validateUserData(authData.data);

      if (authUser.user) {
        return reply.authenticated({ credentials: { user: authUser.user } });
      }

      return reply.unauthenticated(Boom.unauthorized(authUser.message)); // If user validation fails
    }

    return reply.unauthenticated(Boom.unauthorized(authData.message)); // If token validation fails

  }

  async verifyTokenAsync(token: string, publicKey: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });
  }

  async decodeToken(token: string): Promise<TokenResponse> {
    return await new Promise((resolve, reject) => {
      fs.readFile('src/server/key/cert.pub', 'UTF-8', (err, content) => {
        if (err) {
          reject(err);
        }
        resolve(content);
      });
    })
      .then(async publicKey => {
        return await this.verifyTokenAsync(token, publicKey as string)
          .then(decoded => {
            return {
              data: decoded as UserInstance
            };
          })
          .catch(() => {
            return {
              code: 400,
              message: 'Bad token.'
            };
          });
      })
      .catch(err => {
        return {
          code: 500,
          message: 'Error reading file.'
        };
      });
  }

  async validateUserData(tokenUser: UserInstance): Promise<UserData> {
    const user = await db.User.findByPk(tokenUser.id);

    if (!user) {
      return {
        message: "User doesn't exist.",
        code: 400
      };
    }

    const tokenUserArray = [
      tokenUser.email,
      tokenUser.name,
      tokenUser.avatar
    ];

    const userArray = [
      user.email,
      user.name,
      user.avatar
    ];

    const isUserArraysEqual = tokenUserArray.reduce((previous, current, index) => {
      if (previous) {
        if (current === userArray[index]) {
          return true;
        }
        return false;
      }
      return false;
    }, true);

    if (!isUserArraysEqual) {
      return {
        message: 'User credentials were changed.',
        code: 400
      };
    }

    return {
      user
    };
  }
}

export default new TokenValidator();
