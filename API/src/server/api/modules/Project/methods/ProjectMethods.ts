import db from '../../../../database';
import { UserInstance } from '../../../../database/models/User';
import * as fs from 'fs';
import { join, extname } from 'path';
import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import Token from '../../../shared/token/Token';

interface ProjectResponse {
  response: CustomResponseType;
  accessToken?: string;
}

class ProjectMethods {
  async getUserProjects(userId: string) {
    return await db.User.findAndCountAll({
      include: [
        {
          model: db.Project,
          as: 'projectsIn',
          include: [
            {
              model: db.User,
              as: 'lead'
            }
          ]
        }
      ],
      where: {
        id: userId
      }
    });
  }

  async addUserToProject(userId: string, projectId: string) {
    const userConstraint = await db.UserProject.findOne({
      where: {
        projectId,
        userId
      }
    });

    return await db.UserProject.create({
      projectId,
      userId,
      isAdmin: false,
      isModerator: false,
      isSupervisor: false
    })
      .then(() => {
        return CustomResponse(200, 'User created successfully');
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          return CustomResponse(400, 'User already in project', { formError: 'User is already in this project.' });
        }
        return CustomResponse(500, 'Couldn\'t create constraint', { formError: 'Internal server error.' });
      });
  }
}

export default ProjectMethods;
