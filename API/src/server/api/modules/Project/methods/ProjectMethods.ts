import db from '../../../../database';
import { UserInstance } from '../../../../database/models/User';
import * as fs from 'fs';
import { join, extname } from 'path';
import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import Token from '../../../shared/token/Token';
import { Op } from 'sequelize';

interface ProjectResponse {
  response: CustomResponseType;
  accessToken?: string;
}

class ProjectMethods {
  async getUserProjects(userId: string, order: string, orderBy: string, page: number, rowsPerPage: number, search: string) {
    if (orderBy === 'lead') {
      return await db.User.findAndCountAll({
        subQuery: false,
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
          id: userId,
          [Op.or]: [
            { '$projectsIn.name$': { [Op.iLike]: `%${search}%` } },
            { '$projectsIn.lead.name$': { [Op.iLike]: `%${search}%` } },
            { '$projectsIn.lead.email$': { [Op.iLike]: `%${search}%` } }
          ]
        },
        order: [
          [{ model: db.Project, as: 'projectsIn' }, { model: db.User, as: 'lead' }, 'name', order]
        ],
        limit: rowsPerPage,
        offset: (page * rowsPerPage)
      });
    }
    return await db.User.findAndCountAll({
      subQuery: false,
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
        id: userId,
        [Op.or]: [
          { '$projectsIn.name$': { [Op.iLike]: `%${search}%` } },
          { '$projectsIn.lead.name$': { [Op.iLike]: `%${search}%` } },
          { '$projectsIn.lead.email$': { [Op.iLike]: `%${search}%` } }
        ]
      },
      order: [
        [{ model: db.Project, as: 'projectsIn' }, orderBy, order]
      ],
      limit: rowsPerPage,
      offset: (page * rowsPerPage)
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
