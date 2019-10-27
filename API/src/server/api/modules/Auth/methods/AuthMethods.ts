import { Op } from 'sequelize';
import * as httpStatus from 'http-status';
import db from '../../../../database';
import ApiError from '../../../error/ApiError';
import { UserInstance } from '../../../../database/models/User';
import { encryption } from '../../../../../utils';


class AuthMethods {

  async getUserByEmail(email: string) {
    return db.User.findOne({
      where: {
        email: {
          [Op.iLike]: email
        }
      }
    });
  }

  async findAndDeleteToken(id: string) {
    db.SessionToken.findAll({
      where: {
        userId: id
      }
    })
    .then(tokens => {
      tokens.forEach(token => {
        token.destroy();
      });
    });
  }

  async createUser(payload: {
    email: string;
    password: string;
    name: string;
  }) {
    const user = await this.getUserByEmail(payload.email);

    if (user) {
      throw ApiError.boom(null, { message: 'already_exists', statusCode: httpStatus.UNPROCESSABLE_ENTITY });
    }

    const newUser = await db.User.create({
      email: payload.email,
      password: encryption.hash(payload.password),
      name: payload.name
    });

    return newUser;
  }

  async createNewSessionTokenForUser(localUser: UserInstance, headers?: any) {
    return await db.SessionToken.create({
      userId: <string>localUser.id
    });
  }
}

export default AuthMethods;
