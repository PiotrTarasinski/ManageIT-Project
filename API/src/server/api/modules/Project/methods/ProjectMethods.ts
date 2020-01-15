import db from '../../../../database';
import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import { Op } from 'sequelize';
import { UserInstance } from '../../../../database/models/User';
import { TaskInstance } from '../../../../database/models/Task';

interface ProjectResponse {
  response: CustomResponseType;
  accessToken?: string;
}

class ProjectMethods {

  // Returns paginated projects result
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

  // Return CustomResponse either with error code or 200
  // Backlogs to project
  async addUserToProject(userId: string, projectId: string, userName: string, loggedUserId: string) {

    return await db.UserProject.create({
      projectId,
      userId
    })
      .then(async () => {
        const addedUser = await db.User.findByPk(userId);
        return await db.Backlog.create({
          projectId,
          content: `${userName} added user ${(<UserInstance>addedUser).name} to the project.`,
          userId: loggedUserId
        })
          .then(() => CustomResponse(200, 'User created successfully'))
          .catch(() => CustomResponse(500, 'Couldn\'t create backlog.', { formError: 'Internal server error.' }));
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          return CustomResponse(400, 'User already in project', { formError: 'User is already in this project.' });
        }
        console.log(err);
        return CustomResponse(500, 'Couldn\'t create constraint', { formError: 'Internal server error.' });
      });
  }

  // Returns CustomResponse
  // Backlogs to project
  async deleteUserFromProject(userId: string, projectId: string, userName: string, loggedUserId: string) {
    return await db.UserProject.destroy({
      where: {
        userId,
        projectId
      }
    })
      .then(async (count) => {
        if (!count) {
          return CustomResponse(400, 'User not in project.', { formError: 'Supplied user is not a part of this project.' });
        }
        const removedUser = await db.User.findByPk(userId);
        return await db.Backlog.create({
          projectId,
          content: `${userName} removed user ${(<UserInstance>removedUser).name} from the project.`,
          userId: loggedUserId
        })
          .then(() => CustomResponse(200, 'Successfully removed user from project.'))
          .catch(() => CustomResponse(500, 'Couldn\'t create backlog.', { formError: 'Internal server error.' }));
      })
      .catch(() => {
        return CustomResponse(500, 'Couldn\'t delete user.', { formError: 'Internal server error.' });
      });
  }

  // Returns paginated users from project result
  async getProjectUsersPaginated(projectId: string, order: string, orderBy: string, page: number, rowsPerPage: number, search: string) {

    const count = await db.Project.count({
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
      group: 'users.id'
    });

    if (orderBy === 'dateOfJoin' || orderBy === 'permissions') {
      const users = await db.Project.findOne({ // Gratki dla teamu sequelize za wzorowe wykonanie asocjacji m:n
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

      return { rows: users, count: (<any>count).length };
    }
    const users = await db.Project.findOne({
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
        [{ model: db.User, as: 'users' }, orderBy, order]
      ],
      limit: rowsPerPage,
      offset: (page * rowsPerPage)
    });

    return { project: users, count: (<any>count).length };
  }

  // Returns users from project
  async getProjectUsers(projectId: string) {
    const count = await db.Project.count({
      where: {
        id: projectId
      },
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
      group: 'users.id'
    });
    const users = await db.Project.findOne({
      where: {
        id: projectId
      },
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
            },
            {
              model: db.UserProjectLabel,
              include: [
                {
                  model: db.RoleLabel,
                  as: 'roleLabel'
                }
              ]
            }
          ]
        }
      ],
      order: [
        [{ model: db.User, as: 'users' }, 'name', 'ASC']
      ]
    });

    return { project: users, count: (<any>count).length };
  }

  // Creates and returns project or undefined
  // Backlogs to project
  async createProject(name: string, identifier: string, leadId: string, userName: string, loggedUserId: string) {
    return await db.Project.create({
      name,
      identifier,
      leadId
    })
      .then(async project => {
        await project.addUser(leadId, { through: { permissions: 'Admin' } })
          .then(async () => {
            await db.Backlog.create({
              projectId: <string>project.id,
              content: `${userName} created this project.`,
              userId: loggedUserId
            });
          });
        return project;
      });
  }

  // Removes project from db
  async deleteProject(id: string) {
    const project = await db.Project.findByPk(id);
    if (project) {
      return project.destroy()
        .then(() => CustomResponse(200, 'Project deleted successfully'))
        .catch((err) => CustomResponse(500, 'Couldn\'t delete project.', { formError: 'Database error.' }));
    }
    return CustomResponse(404, 'No such project.', { formError: 'Project not found.' });
  }

  // Returns CustomResponse
  // Backlogs to project
  async updateProject(projectId: string, name: string, state: string, leadId: string, userName: string, loggedUserId: string) {
    const project = await db.Project.findByPk(projectId);

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
        .then(async () => {
          return await db.Backlog.create({
            projectId,
            content: `${userName} updated project details.`,
            userId: loggedUserId
          })
            .then(() => CustomResponse(200, 'Project updated successfully'))
            .catch(() => CustomResponse(500, 'Couldn\'t create backlog.', { formError: 'Database error.' }));
        })
        .catch(() => CustomResponse(500, 'Couldn\'t update project.', { formError: 'Database error.' }));
    }
    return CustomResponse(404, 'No such project.', { formError: 'Project not found.' });
  }

  // Get tasks assigned to project with given id
  async getProjectTasks(projectId: string) {
    return await db.Project.findOne({
      include: [
        {
          model: db.Task,
          as: 'tasks',
          include: [
            {
              model: db.TaskSprint,
              as: 'tasksSprints'
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
      where: {
        id: projectId
      }
    })
      .then(async tasksNotDone => {
        const tasks: TaskInstance[] = [];
        if (tasksNotDone && tasksNotDone.tasks) {
          tasksNotDone.tasks.forEach(task => {
            let done: boolean = false;
            if (task.tasksSprints) {
              task.tasksSprints.forEach(taskSprint => {
                if (taskSprint.state === 'Done' || taskSprint.sprintId === tasksNotDone.activeSprintId) {
                  done = true;
                }
              });
              if (!done) {
                tasks.push(task);
              }
            }
          });
          return { activeSprintId: tasksNotDone.activeSprintId, tasks };
        }
        return null;
      });
  }

  // Returns an array of UserRoles
  async getProjectRoles(projectId: string) {
    return await db.RoleLabel.findAll({
      where: {
        projectId
      },
      order: [
        ['color', 'ASC']
      ]
    });
  }

  async updateProjectRole(projectId: string, roleId: string, name: string, color: string) {
    const roleLabel = await db.RoleLabel.find({
      where: {
        id: roleId,
        projectId
      }
    });

    if (roleLabel) {
      return await roleLabel.update({
        name, color
      })
        .then(() => CustomResponse(200, 'Role updated successfully.'))
        .catch(() => CustomResponse(500, 'Couldn\'t update role.', { formError: 'Database error.' }));
    }
    return CustomResponse(404, 'No such role.', { formError: 'Role not found' });
  }

  async deleteTasks(projectId: string, tasks: string[], userName: string, loggedUserId: string) {

    let deleteCount = 0;

    const project = await db.Project.findByPk(projectId);

    if (!project) {
      return CustomResponse(404, 'No such project.', { formError: 'Project not found.' });
    }
    return Promise.all(tasks.map(async taskId => {
      await db.Task.findByPk(taskId)
        .then(async task => {
          if (task) {
            const { projectId, title } = task;
            if (!await db.TaskSprint.findOne({
              where: {
                taskId,
                sprintId: project.activeSprintId
              }
            })) {
              await task.destroy()
                .then(async () => {
                  await db.Backlog.create({
                    projectId,
                    content: `${userName} deleted a task: ${title}.`,
                    userId: loggedUserId
                  });
                });
            } else if (await db.TaskSprint.count({
              where: {
                taskId,
                sprintId: { [Op.ne]: project.activeSprintId }
              }
            })) {
              await task.update({ projectId: null });
            }
          }
          deleteCount++;
        });
    }))
    .then(() => {
      if (!deleteCount) {
        return CustomResponse(500, 'Couldn\'t delete any tasks.', { formError: 'Database error.' });
      }
      if (deleteCount !== tasks.length) {
        return CustomResponse(500, 'Couldn\'t delete one or more.', { formError: 'Database error.' });
      }
      return CustomResponse(200, 'Task deleted successfully.');
    });
  }

  async updateProjectUser(userId: string, projectId: string, permissions: 'User' | 'Admin', roles: string[]): Promise<UserInstance | null> {
    return await db.UserProject.findOne({
      where: {
        userId,
        projectId
      }
    })
    .then(async userProject => {
      if (userProject) {
        await userProject.update({ permissions });
        await db.UserProjectLabel.destroy({
          where: {
            userId,
            projectId
          }
        });
        await Promise.all(roles.map(async role => {
          await db.UserProjectLabel.create({
            userId,
            projectId,
            roleLabelId: role
          });
        }));
      }
      if (roles.length === 0) {
        return await db.User.findByPk(userId, {
          include: [
            {
              model: db.UserProject,
              where: {
                projectId
              },
              as: 'permissions'
            }
          ]
        });
      }
      return await db.User.findByPk(userId, {
        include: [
          {
            model: db.UserProjectLabel,
            where: {
              projectId
            },
            include: [
              {
                model: db.RoleLabel,
                as: 'roleLabel'
              }
            ]
          },
          {
            model: db.UserProject,
            where: {
              projectId
            },
            as: 'permissions'
          }
        ]
      });
    });
  }
}

export default ProjectMethods;
