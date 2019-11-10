import { Op } from 'sequelize';
import db from '../../../../database';
import { encryption } from '../../../../../utils';
import CustomResponse from '../../../error/CustomError';

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
    }).then(tokens => {
      tokens.forEach(token => {
        token.destroy();
      });
    });
  }

  async createUser(payload: { email: string; password: string; name: string }) {
    const user = await this.getUserByEmail(payload.email);

    if (user) {
      return CustomResponse(400, 'User already exists', { email: 'email already exists' });
    }

    await db.User.create({
      email: payload.email,
      password: encryption.hash(payload.password),
      name: payload.name
    });

    return CustomResponse(200, 'User registered successfully.');
  }

}

export default AuthMethods;
