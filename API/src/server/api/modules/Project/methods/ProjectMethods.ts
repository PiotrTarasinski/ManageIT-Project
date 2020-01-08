import db from '../../../../database';
import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import { Op } from 'sequelize';
import sequelize = require('sequelize');
import permissions from '../../../../../utils/permissions';

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

  async deleteUserFromProject(userId: string, projectId: string) {
    return await db.UserProject.destroy({
      where: {
        userId,
        projectId
      }
    })
      .then((count) => {
        if (!count) {
          return CustomResponse(400, 'User not in project.', { formError: 'Supplied user is not a part of this project.' });
        }
        return CustomResponse(200, 'User deleted successfully');
      })
      .catch(() => {
        return CustomResponse(500, 'Couldn\'t delete user.', { formError: 'Internal server error.' });
      });
  }

  async getProjectUsersPaginated(projectId: string, order: string, orderBy: string, page: number, rowsPerPage: number, search: string) {
    if (orderBy === 'dateOfJoin' || orderBy === 'permissions') {
      return await db.Project.findAndCountAll({ // Gratki dla teamu sequelize za wzorowe wykonanie asocjacji m:n
        subQuery: false,
        include: [
          {
            model: db.User,
            as: 'users',
            include: [
              {
                model: db.UserProject,
                as: 'permissions',
                where: {
                  projectId
                }
              }
            ]
          }
        ],
        where: {
          id: projectId,
          [Op.or]: [
            { '$users.name$': { [Op.iLike]: `%${search}%` } },
            { '$users.email$': { [Op.iLike]: `%${search}%` } }
          ]
        },
        order: [
          [{ model: db.User, as: 'users' },
           { model: db.UserProject, as: 'permissions' }, orderBy === 'dateOfJoin' ? 'createdAt' : 'permissions', order]
        ],
        limit: rowsPerPage,
        offset: (page * rowsPerPage)
      });
    }
    return await db.Project.findAndCountAll({
      subQuery: false,
      include: [
        {
          model: db.User,
          as: 'users'
        }
      ],
      where: {
        id: projectId,
        [Op.or]: [
          { '$users.name$': { [Op.iLike]: `%${search}%` } },
          { '$users.email$': { [Op.iLike]: `%${search}%` } }
        ]
      },
      order: [
        [{ model: db.User, as: 'users' }, orderBy, order]
      ],
      limit: rowsPerPage,
      offset: (page * rowsPerPage)
    });
  }

  async getProjectUsers(projectId: string) {
    return await db.Project.findAndCountAll({
      where: {
        id: projectId
      },
      include: [
        {
          model: db.User,
          as: 'users'
        }
      ]
    });
  }

  async createProject(name: string, state: string, leadId: string) {
    return await db.Project.create({
      name,
      state,
      leadId
    })
      .then(async project => {
        await project.addUser(leadId, { through: { permissions: 'Admin' } });
        return project;
      });
  }

  async deleteProject(id: string) {
    const project = await db.Project.findByPk(id);
    if (project) {
      return project.destroy()
        .then(() => CustomResponse(200, 'Project deleted successfully'))
        .catch(() => CustomResponse(500, 'Couldn\'t delete project.', { formError: 'Database error.' }));
    }
    return CustomResponse(404, 'No such project.', { formError: 'Project not found.' });
  }

  async updateProject(id: string, name: string, state: string, leadId: string) {
    const project = await db.Project.findByPk(id);

    if (project) {
      if (name) {
        project.name = name;
      }
      if (state) {
        project.state = state;
      }
      if (leadId) {
        project.leadId = leadId;
      }
      return await project.save()
        .then(() => CustomResponse(200, 'Project updated successfully'))
        .catch(() => CustomResponse(500, 'Couldn\'t update project.', { formError: 'Database error.' }));
    }
    return CustomResponse(404, 'No such project.', { formError: 'Project not found.' });
  }

  // Get entries assigned to project wioth given id
  async getProjectEntries(id: string) {
    return await db.Project.findByPk(id, {
      include: [
        {
          model: db.SprintEntry,
          as: 'entries',
          include: [
            {
              model: db.User,
              as: 'assign'
            },
            {
              model: db.User,
              as: 'reviewers'
            },
            {
              model: db.Label,
              as: 'labels'
            },
            {
              model: db.Comment,
              as: 'comments',
              separate: true,
              include: [
                {
                  model: db.User,
                  as: 'user'
                }
              ]
            }
          ]
        }
      ],
      order: [
        [{ model: db.SprintEntry, as: 'entries' }, 'priority', 'ASC']
      ]
    });
  }

  // Create entry for given project
  async createEntry(
    points: string,
    priority: string,
    state: string,
    type: string,
    title: string,
    description: string,
    projectId: string,
    projectName: string) {
    const count = await db.SprintEntry.count({
      where: {
        projectId
      }
    });
    return await db.SprintEntry.create({
      points: Number.parseInt(points, 10),
      priority,
      state,
      type,
      identifier: `${projectName.substr(0, 3).toUpperCase()}-${count}`,
      title,
      description,
      projectId
    })
      .then(() => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }
}

export default ProjectMethods;
