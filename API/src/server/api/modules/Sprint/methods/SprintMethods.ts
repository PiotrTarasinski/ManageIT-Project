import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import db from '../../../../database';
import { Op } from 'sequelize';
import { SprintInstance } from '../../../../database/models/Sprint';

class SprintMethods {

  // Get tasks assigned to sprint with given id
  async getSprintTasks(sprintId: string) {
    return await db.Sprint.findByPk(sprintId, {
      include: [
        {
          model: db.TaskSprint,
          as: 'taskList',
          include: [
            {
              model: db.Task,
              as: 'task',
              include: [
                {
                  model: db.Comment,
                  separate: true,
                  as: 'comments',
                  include: [
                    {
                      model: db.User,
                      as: 'user'
                    }
                  ]
                }
              ]
            },
            {
              model: db.User,
              as: 'assignees'
            },
            {
              model: db.User,
              as: 'reviewers'
            }
          ]
        }
      ],
      order: [
        [{ model: db.TaskSprint, as: 'taskList' }, 'index', 'ASC']
      ]
    });
  }

  // Changes task state and decrements or increments other task indexes
  async changeTaskState(
    sprintId: string,
    taskId: string,
    indexFrom: number | string,
    indexTo: number | string,
    stateFrom: string,
    stateTo: string): Promise<CustomResponseType> {
    const taskToChange = await db.TaskSprint.find({
      where: {
        sprintId,
        taskId
      }
    });
    if (taskToChange && taskToChange.sprintId) {
      // tslint:disable-next-line:triple-equals
      if (taskToChange.state === stateFrom && taskToChange.index == indexFrom) {
        if (stateFrom === stateTo) {
          if (indexFrom === indexTo) {
            return CustomResponse(200, 'Nothing to change.');
          }
          const tasks = await db.TaskSprint.findAll({
            where: {
              sprintId,
              [Op.or]: [
                { state: stateFrom },
                { state: stateTo }
              ]
            }
          });
          tasks.forEach(async instance => {
            if (instance.index || instance.index === 0) {
              // tslint:disable-next-line:triple-equals
              if (instance.index == indexFrom) {
                await instance.update({ index: indexTo });
              } else if (instance.index <= indexTo && instance.index > indexFrom) {
                await instance.decrement('index', { by: 1 });
              } else if (instance.index >= indexTo && indexFrom > indexTo && instance.index < indexFrom) {
                await instance.increment('index', { by: 1 });
              }
            }
          });

          return CustomResponse(200, 'Successfully changed index.');
        }

        const tasks = await db.TaskSprint.findAll({
          where: {
            sprintId,
            [Op.or]: [
              { state: stateFrom },
              { state: stateTo }
            ]
          }
        });
        tasks.forEach(async instance => {
          if (instance.index || instance.index === 0) {
            if (instance.taskId === taskId) {
              instance.update({ index: indexTo, state: stateTo });
            } else if (instance.state === stateFrom && instance.index > indexFrom) {
              await instance.decrement('index', { by: 1 });
            } else if (instance.state === stateTo && instance.index >= indexTo) {
              await instance.increment('index', { by: 1 });
            }
          }
        });
        return CustomResponse(200, 'Successfully changed state.');
      }
    }
    return CustomResponse(400, 'Invalid payload input.', { formError: 'Either index, state is invalid or task not in sprint.' });
  }

  // Removes task with given id from sprint
  async removeTasksFromSprint(sprintId: string, tasks: string[]) {
    let deleteCount = 0;
    return Promise.all(tasks.map(async taskId => {
      const taskToRemove = await db.TaskSprint.findOne({
        where: {
          taskId,
          sprintId
        }
      });
      if (taskToRemove) {
        const { state } = taskToRemove;
        return taskToRemove.destroy()
        .then(() => {
          return state;
        });
      }
      return null;
    }))
    .then(async (stateArray) => {
      const removesFrom = {
        'In progress': 0,
        'To review / test': 0,
        'To do': 0,
        Done: 0
      };
      const index = {
        'In progress': 0,
        'To review / test': 0,
        'To do': 0,
        Done: 0
      };
      stateArray.forEach(state => {
        if (state) {
          deleteCount++;
          removesFrom[state as 'To do' | 'In progress' | 'To review / test' | 'Done']++;
        }
      });
      const tasksToDecrement = await db.TaskSprint.findAll({
        where: {
          sprintId
        }
      });
      tasksToDecrement.forEach(async task => {
        if (removesFrom[task.state  as 'To do' | 'In progress' | 'To review / test' | 'Done']) {
          await task.update({ index: index[task.state  as 'To do' | 'In progress' | 'To review / test' | 'Done']++ });
        }
      });
      if (!deleteCount) {
        return CustomResponse(500, 'Couldn\'t delete any tasks.', { formError: 'Database error.' });
      }
      if (deleteCount !== tasks.length) {
        return CustomResponse(500, 'Couldn\'t delete one or more.', { formError: 'Database error.' });
      }
      return CustomResponse(200, 'Task deleted successfully.');
    });
  }

  // Add assignee or reviewer to task
  async addUserToTask(taskId: string, sprintId: string, userId: string, type: string, remove: boolean): Promise<CustomResponseType> {
    const taskSprint = await db.TaskSprint.find({
      where: {
        taskId,
        sprintId
      }
    });

    if (!taskSprint) {
      return CustomResponse(404, 'Task is not in sprint.', { formError: 'Task is not in this sprint.' });
    }

    const user = await db.User.findByPk(userId);

    if (!user) {
      return CustomResponse(404, 'No user with such id.', { formError: 'User not found.' });
    }

    if (remove) {
      if (type === 'Assign') {
        return await taskSprint.removeAssignee(user)
        .then(() => CustomResponse(200, 'Successfully removed assignee.'))
        .catch(() => CustomResponse(500, 'Coouldn\'t delete assignee.', { formError: 'Database error.' }));
      }
      if (type === 'Review') {
        return await taskSprint.removeReviewer(user)
        .then(() => CustomResponse(200, 'Successfully removed reviewer.'))
        .catch(() => CustomResponse(500, 'Coouldn\'t delete reviewer.', { formError: 'Database error.' }));
      }
      return CustomResponse(400, 'Wrong type.', { formError: 'Invalid payload input.' });
    }
    if (type === 'Assign') {
      return await taskSprint.addAssignee(user)
        .then(() => {
          return CustomResponse(200, 'Successfully added an assignee.');
        })
        .catch(() => {
          return CustomResponse(500, 'Couldn\'t add an assignee.', { formError: 'Database error.' });
        });
    }
    if (type === 'Review') {
      return await taskSprint.addReviewer(user)
        .then(() => {
          return CustomResponse(200, 'Successfully added a reviewer.');
        })
        .catch(() => {
          return CustomResponse(500, 'Couldn\'t add a reviewer.', { formError: 'Database error.' });
        });
    }
    return CustomResponse(400, 'Wrong type.', { formError: 'Invalid payload input.' });
  }

  async addTaskToSprint(sprintId: string, tasks: string[]): Promise<SprintInstance | null> {
    return await db.Sprint.findByPk(sprintId)
    .then(async sprint => {
      if (sprint) {
        const index = {
          'In progress': await db.TaskSprint.count({
            where: {
              sprintId,
              state: 'In progress'
            }
          }),
          'To review / test': await db.TaskSprint.count({
            where: {
              sprintId,
              state: 'To review / test'
            }
          }),
          'To do': await db.TaskSprint.count({
            where: {
              sprintId,
              state: 'To do'
            }
          }),
          Done: 0
        };
        return Promise.all(tasks.map(async taskId => {
          const task = await db.Task.findByPk(taskId);
          if (task && !await db.TaskSprint.count({
            where: {
              taskId,
              sprintId
            }
          })) {
            return sprint.createTaskList({
              index: index[task.state === 'Awaiting' ? 'To do' : task.state as 'To do' | 'In progress' | 'To review / test' | 'Done']++,
              state: task.state === 'Awaiting' ? 'To do' : <string>task.state,
              taskId
            });
          }
          return null;
        }))
      .then(async () => {
        return await db.Sprint.findByPk(sprint.id, {
          include: [
            {
              model: db.TaskSprint,
              as: 'taskList',
              include: [
                {
                  model: db.Task,
                  as: 'task',
                  include: [
                    {
                      model: db.Comment,
                      separate: true,
                      as: 'comments',
                      include: [
                        {
                          model: db.User,
                          as: 'user'
                        }
                      ]
                    }
                  ]
                },
                {
                  model: db.User,
                  as: 'assignees',
                  through: {
                    attributes: []
                  }
                },
                {
                  model: db.User,
                  as: 'reviewers',
                  through: {
                    attributes: []
                  }
                }
              ]
            }
          ],
          order: [
            [{ model: db.TaskSprint, as: 'taskList' }, 'index', 'ASC']
          ]
        });
      });
      }
      return sprint;
    });
  }

  async createSprint(projectId: string, description: string, name: string, start: Date, end: Date, tasks: string[]) {
    return await db.Sprint.create({
      name,
      description,
      start: new Date(start),
      end: new Date(end)
    })
    .then(async sprint => {
      await sprint.setProject(projectId);
      const index = {
        Awaiting: 0,
        'In progress': 0,
        'To review / test': 0,
        'To do': 0,
        Done: 0
      };
      return Promise.all(tasks.map(async taskId => {
        const task = await db.Task.findByPk(taskId);
        if (task) {
          return sprint.createTaskList({
            index: index[task.state === 'Awaiting' ? 'To do' : task.state as 'To do' | 'In progress' | 'To review / test' | 'Done']++,
            state: task.state === 'Awaiting' ? 'To do' : <string>task.state,
            taskId
          });
        }
        return null;
      }))
      .then(async () => await db.Sprint.findByPk(sprint.id, {
        include: [
          {
            model: db.TaskSprint,
            as: 'taskList',
            include: [
              {
                model: db.Task,
                as: 'task',
                include: [
                  {
                    model: db.Comment,
                    separate: true,
                    as: 'comments',
                    include: [
                      {
                        model: db.User,
                        as: 'user'
                      }
                    ]
                  }
                ]
              },
              {
                model: db.User,
                as: 'assignees',
                through: {
                  attributes: []
                }
              },
              {
                model: db.User,
                as: 'reviewers',
                through: {
                  attributes: []
                }
              }
            ]
          }
        ],
        order: [
          [{ model: db.TaskSprint, as: 'taskList' }, 'index', 'ASC']
        ]
      }));
    });
  }

}

export default SprintMethods;
