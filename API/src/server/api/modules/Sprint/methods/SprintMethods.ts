import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import db from '../../../../database';
import { Op } from 'sequelize';

class SprintMethods {

  // Get tasks assigned to sprint with given id
  async getSprintTasks(id: string) {
    return await db.Sprint.findByPk(id, {
      include: [
        {
          model: db.Task,
          as: 'tasks',
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
        [{ model: db.Task, as: 'tasks' }, 'index', 'ASC']
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
    const taskToChange = await db.Task.findByPk(taskId);
    if (taskToChange && taskToChange.sprintId) {
      // tslint:disable-next-line:triple-equals
      if (taskToChange.state === stateFrom && taskToChange.index == indexFrom) {
        if (stateFrom === stateTo) {
          if (indexFrom === indexTo) {
            return CustomResponse(200, 'Nothing to change.');
          }
          const tasks = await db.Task.findAll({
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

        const tasks = await db.Task.findAll({
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
            if (instance.id === taskId) {
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

  // Deletes task with given id
  async deleteTaskFromSprint(id: string) {
    const taskToDelete = await db.Task.findByPk(id);
    if (taskToDelete) {
      const { index, state, sprintId } = taskToDelete;
      if (sprintId) {
        const tasks = await db.Task.findAll({
          where: {
            state,
            sprintId,
            index: { [Op.gt]: index }
          }
        });
        tasks.forEach(async instance => {
          instance.decrement('index', { by: 1 });
        });
      }
      return taskToDelete.destroy()
        .then(() => {
          return true;
        })
        .catch((err) => {
          return false;
        });
    }
    return false;
  }




  // Add assignee or reviewer to task
  async addUserToTask(id: string, userId: string, type: string): Promise<CustomResponseType> {
    const task = await db.Task.findByPk(id);

    if (!task) {
      return CustomResponse(404, 'No task with such id.', { formError: 'Task not found.' });
    }

    const assign = await db.User.findByPk(userId);

    if (!assign) {
      return CustomResponse(404, 'No user with such id.', { formError: 'User not found.' });
    }

    if (type === 'Assign') {
      return await task.addAssign(assign)
        .then(() => {
          return CustomResponse(200, 'Successfully added an assignee.');
        })
        .catch(() => {
          return CustomResponse(500, 'Couldn\'t add an assignee.', { formError: 'Database error.' });
        });
    }
    if (type === 'Review') {
      return await task.addReviewer(assign)
        .then(() => {
          return CustomResponse(200, 'Successfully added a reviewer.');
        })
        .catch(() => {
          return CustomResponse(500, 'Couldn\'t add a reviewer.', { formError: 'Database error.' });
        });
    }
    return CustomResponse(400, 'Wrong type.', { formError: 'Invalid payload input.' });
  }

  async removeUserFromTask(id: string, userId: string, type: string): Promise<CustomResponseType> {
    const task = await db.Task.findByPk(id);

    if (task) {
      const user = await db.User.findByPk(userId);

      if (user) {
        if (type === 'Assign') {
          return await task.removeAssign(user)
          .then(() => CustomResponse(200, 'Successfully removed assignee.'))
          .catch(() => CustomResponse(500, 'Coouldn\'t delete assignee.', { formError: 'Database error.' }));
        }
        if (type === 'Review') {
          return await task.removeReviewer(user)
          .then(() => CustomResponse(200, 'Successfully removed reviewer.'))
          .catch(() => CustomResponse(500, 'Coouldn\'t delete reviewer.', { formError: 'Database error.' }));
        }
        return CustomResponse(400, 'Wrong type.', { formError: 'Invalid payload input.' });
      }
      return CustomResponse(404, 'User doesn\'t exist.', { formError: 'User not found.' });
    }
    return CustomResponse(404, 'Task doesn\'t exist.', { formError: 'Task not found.' });
  }

  // Update existing task
  async updateTask(
    id: string,
    points: string,
    priority: string,
    type: string,
    title: string,
    description: string): Promise<CustomResponseType> {
    const task = await db.Task.findByPk(id);

    if (!task) {
      return CustomResponse(404, 'No such task.', { formError: 'Task not found.' });
    }

    return await task.update({
      points,
      priority,
      type,
      title,
      description
    })
      .then(() => {
        return CustomResponse(200, 'Successfully updated an task.');
      })
      .catch(() => {
        return CustomResponse(500, 'Couldn\'t update an task.', { formError: 'Database error.' });
      });
  }

  async addTaskToSprint(id: string, sprintId: string) {
    const sprint = await db.Sprint.findByPk(sprintId);

    if (sprint) {
      const task = await db.Task.findByPk(id);
      if (task) {
        if (task.sprintId === sprintId) {
          return CustomResponse(400, 'Task already in sprint.', { formError: 'Task already in this sprint.' });
        }
        return await sprint.addTask(task)
        .then(() => CustomResponse(200, 'Successfully added task to sprint.'))
        .catch(() => CustomResponse(500, 'Database error.', { formError: 'Database error.' }));
      }
      return CustomResponse(404, 'Task doesn\'t exist.', { formError: 'Task not found.' });
    }

    return CustomResponse(404, 'Sprint doesn\'t exist.', { formError: 'Sprint not found.' });
  }

  async removeTaskFromSprint(id: string): Promise<CustomResponseType> {
    const task = await db.Task.findByPk(id);

    if (task) {
      if (!task.sprintId) {
        return CustomResponse(400, 'Task is not in sprint.', { formError: 'Invalid payload input.' });
      }
      return await task.update({ sprintId: null })
      .then(() => CustomResponse(200, 'Successfully removed task from sprint.'))
      .catch(() => CustomResponse(500, 'Couldn\'t remove task from sprint.', { formError: 'Database error.' }));
    }

    return CustomResponse(404, 'Task doesn\'t exist.', { formError: 'Task not found.' });
  }

  async addComment(id: string, userId: string, content: string) {
    const comment = await db.Comment.create({
      content,
      userId,
      taskId: id
    });
    if (comment) {
      return await db.Comment.findByPk(comment.id, {
        include: [
          {
            model: db.User,
            as: 'user'
          }
        ]
      });
    }
    return null;
  }

  async deleteComment(id: string) {
    const comment = await db.Comment.findByPk(id);

    console.log(comment);

    if (comment) {
      return await comment.destroy()
      .then(() => CustomResponse(200, 'Successfully deleted comment.'))
      .catch(() => CustomResponse(500, 'Couldn\'t delete comment', { formError: 'Database error.' }));
    }

    return CustomResponse(404, 'No such comment.', { formError: 'Comment not found.' });
  }

  async updateComment(id: string, content: string) {
    const comment = await db.Comment.findByPk(id, {
      include: [
        {
          model: db.User,
          as: 'user'
        }
      ]
    });

    if (comment) {
      return await comment.update({
        content
      });
    }

    return null;
  }

}

export default SprintMethods;
