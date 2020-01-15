import db from '../../../../database';
import CustomResponse, { CustomResponseType } from '../../../error/CustomError';

class TaskMethods {

  // Create task for given project
  // Backlogs to project
  async createTask(
    points: string,
    priority: string,
    type: string,
    title: string,
    description: string,
    projectId: string,
    userName: string,
    loggedUserId: string) {
    const count = await db.Task.count({
      where: {
        projectId
      }
    });
    const project = await db.Project.findByPk(projectId);


    if (!project) {
      return null;
    }
    return await db.Task.create({
      points: Number.parseInt(points, 10),
      priority,
      type,
      identifier: `${project.identifier}-${count}`,
      title,
      description,
      projectId
    })
    .then(async (task) => {
      return await db.Backlog.create({
        projectId,
        content: `${userName} created a task: ${task.title}.`,
        userId: loggedUserId
      })
      .then(() => task);
    });
  }

  // Update existing task
  // Backlogs to project
  async updateTask(
      taskId: string,
      points: string,
      priority: string,
      type: string,
      title: string,
      description: string,
      labels: string[],
      userName: string,
      loggedUserId: string) {
    const task = await db.Task.findByPk(taskId);

    if (task) {
      return await task.update({
        points,
        priority,
        type,
        title,
        description
      })
      .then(async () => {
        await task.setLabels(labels);
        return await db.Backlog.create({
          projectId: task.projectId,
          content: `${userName} updated a task: ${task.title}.`,
          userId: loggedUserId
        })
        .then(async () => await db.Task.findByPk(taskId, {
          include: [
            {
              model: db.Label,
              as: 'labels'
            }
          ]
        }));
      });
    }

    return null;
  }

  // Delete existing task
  // Backlogs to project
  async deleteTask(taskId: string, userName: string, loggedUserId: string) {
    const task = await db.Task.findByPk(taskId);

    if (task) {
      const { projectId, title } = task;
      return await task.destroy()
      .then(async () => {
        return await db.Backlog.create({
          projectId,
          content: `${userName} deleted a task: ${title}.`,
          userId: loggedUserId
        })
        .then(() => CustomResponse(200, 'Task deleted successfully.'))
        .catch(() => CustomResponse(500, 'Couldn\'t create backlog.', { formError: 'Database error.' }));
      })
      .catch(() => CustomResponse(500, 'Couldn\'t delete task.', { formError: 'Database error.' }));
    }
    return CustomResponse(404, 'No such task.', { formError: 'Task not found.' });
  }

  // Create comment on existing project task
  async createComment(taskId: string, userId: string, content: string) {
    const comment = await db.Comment.create({
      content,
      userId,
      taskId
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

  // Update comment on existing project task
  async updateComment(commentId: string, content: string) {
    const comment = await db.Comment.findByPk(commentId, {
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

  // Update comment on existing project task
  async deleteComment(id: string): Promise<CustomResponseType> {
    const comment = await db.Comment.findByPk(id);

    if (comment) {
      return await comment.destroy()
      .then(() => CustomResponse(200, 'Successfully deleted comment.'))
      .catch(() => CustomResponse(500, 'Couldn\'t delete comment', { formError: 'Database error.' }));
    }

    return CustomResponse(404, 'No such comment.', { formError: 'Comment not found.' });
  }

}

export default TaskMethods;
