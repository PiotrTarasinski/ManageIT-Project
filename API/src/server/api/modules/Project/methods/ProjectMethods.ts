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
    return await db.User.findByPk(userId, {
      include: [
        {
          model: db.Project,
          as: 'projectsIn'
        }
      ]
    });
  }
}

export default ProjectMethods;
