import { Op } from 'sequelize';
import db from '../../../../database';
import { encryption } from '../../../../../utils';
import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import Token from '../../../shared/token/Token';

type AuthResponseFormat = {
  response: CustomResponseType;
  token?: string;
};

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

  async setActiveProject(userId:string, id: string): Promise<AuthResponseFormat> {
    const user = await db.User.findByPk(userId);
    if (user) {
      const project = await db.Project.findByPk(id);
      if (project) {
        return await user.setActiveProject(project)
        .then(async () => {
          return await user.setActiveSprint(project.activeSprintId)
          .then(async () => {
            return {
              response: CustomResponse(200, 'Active project set successfully.'),
              token: await new Token().generateTokenForUserInstance(user)
            };
          });
        });
      }
      return { response: CustomResponse(404, 'No such project.', { formError: 'Project not found.' }) };
    }
    return { response: CustomResponse(404, 'No such user.', { formError: 'User not found.' }) };
  }

  async setActiveSprint(userId: string, id: string): Promise<AuthResponseFormat> {
    const user = await db.User.findByPk(userId);

    if (user) {
      const sprint = await db.Sprint.findByPk(id);
      if (sprint) {
        return await user.setActiveSprint(sprint)
        .then(async () => {
          return {
            response: CustomResponse(200, 'Active sprint set successfully.'),
            token: await new Token().generateTokenForUserInstance(user)
          };
        });
      }
      return { response: CustomResponse(404, 'No such sprint.', { formError: 'Sprint not found.' }) };
    }
    return { response: CustomResponse(404, 'No such user.', { formError: 'User not found.' }) };
  }

}

export default AuthMethods;
