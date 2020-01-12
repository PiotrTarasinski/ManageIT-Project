import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import db from '../../../../database';
import { Op } from 'sequelize';

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
              as: 'task'
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
  async removeTaskFromSprint(taskId: string, sprintId: string) {
    const taskToRemove = await db.TaskSprint.find({
      where: {
        taskId,
        sprintId
      }
    });
    if (taskToRemove) {
      const { index, state } = taskToRemove;
      const tasks = await db.TaskSprint.findAll({
        where: {
          state,
          sprintId,
          index: { [Op.gt]: index }
        }
      });
      tasks.forEach(async instance => {
        instance.decrement('index', { by: 1 });
      });
      return taskToRemove.destroy()
        .then(() => {
          return CustomResponse(200, 'Successfully removed task from sprint.');
        })
        .catch((err) => {
          return CustomResponse(500, 'Couldn\'t remove task from sprint.', { formError: 'Database error.' });
        });
    }
    return CustomResponse(404, 'Task not in project.', { formError: 'Task is not in this project.' });
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

  async addTaskToSprint(taskId: string, sprintId: string, state: string, index: number) {
    const task = await db.Task.findByPk(taskId);
    if (task) {
      const taskSprint = await db.TaskSprint.find({
        where: {
          taskId,
          sprintId
        }
      });
      if (taskSprint) {
        return CustomResponse(400, 'Task already in sprint.', { formError: 'Task already in this sprint.' });
      }
      return await db.TaskSprint.create({
        taskId,
        sprintId,
        state,
        index
      })
        .then(async () => {
          const tasks = await db.TaskSprint.findAll({
            where: {
              state,
              sprintId,
              index: { [Op.gte]: index }
            }
          });
          tasks.forEach(async instance => {
            if (instance.taskId !== taskId) {
              instance.increment('index', { by: 1 });
            }
          });
          return CustomResponse(200, 'Successfully added task to sprint.');
        })
        .catch(() => CustomResponse(500, 'Couldn\'t create constraint.', { formError: 'Database error.' }));
    }

    return CustomResponse(404, 'Sprint doesn\'t exist.', { formError: 'Sprint not found.' });
  }


}

export default SprintMethods;
