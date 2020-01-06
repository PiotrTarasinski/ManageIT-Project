import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import db from '../../../../database';
import { Op } from 'sequelize';

class SprintMethods {

  // Get entries assigned to sprint with given id
  async getSprintEntries(id: string) {
    return await db.Sprint.findByPk(id, {
      include: [
        {
          model: db.SprintEntry,
          as: 'sprintEntries',
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
        [{ model: db.SprintEntry, as: 'sprintEntries' }, 'index', 'ASC']
      ]
    });
  }



  // Changes entry state and decrements or increments other entries indexes
  async changeEntryState(
    sprintId: string,
    entryId: string,
    indexFrom: number | string,
    indexTo: number | string,
    stateFrom: string,
    stateTo: string): Promise<CustomResponseType> {
    const entryToChange = await db.SprintEntry.findByPk(entryId);
    if (entryToChange && entryToChange.sprintId) {
      // tslint:disable-next-line:triple-equals
      if (entryToChange.state === stateFrom && entryToChange.index == indexFrom) {
        if (stateFrom === stateTo) {
          if (indexFrom === indexTo) {
            return CustomResponse(200, 'Nothing to change.');
          }
          const entries = await db.SprintEntry.findAll({
            where: {
              sprintId,
              [Op.or]: [
                { state: stateFrom },
                { state: stateTo }
              ]
            }
          });
          entries.forEach(async instance => {
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

        const entries = await db.SprintEntry.findAll({
          where: {
            sprintId,
            [Op.or]: [
              { state: stateFrom },
              { state: stateTo }
            ]
          }
        });
        entries.forEach(async instance => {
          if (instance.index || instance.index === 0) {
            if (instance.id === entryId) {
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
    return CustomResponse(400, 'Invalid payload input.', { formError: 'Either index, state is invalid or entry not in sprint.' });
  }

  // Deletes entry with given id
  async deleteEntry(id: string) {
    const entryToDelete = await db.SprintEntry.findByPk(id);
    if (entryToDelete) {
      const { index, state, sprintId } = entryToDelete;
      if (sprintId) {
        const entries = await db.SprintEntry.findAll({
          where: {
            state,
            sprintId,
            index: { [Op.gt]: index }
          }
        });
        entries.forEach(async instance => {
          instance.decrement('index', { by: 1 });
        });
      }
      return entryToDelete.destroy()
        .then(() => {
          return true;
        })
        .catch((err) => {
          return false;
        });
    }
    return false;
  }




  // Add assignee or reviewer to entry
  async addUserToEntry(id: string, userId: string, type: string): Promise<CustomResponseType> {
    const entry = await db.SprintEntry.findByPk(id);

    if (!entry) {
      return CustomResponse(404, 'No entry with such id.', { formError: 'Entry not found.' });
    }

    const assign = await db.User.findByPk(userId);

    if (!assign) {
      return CustomResponse(404, 'No user with such id.', { formError: 'User not found.' });
    }

    if (type === 'Assign') {
      return await entry.addAssign(assign)
        .then(() => {
          return CustomResponse(200, 'Successfully added an assignee.');
        })
        .catch(() => {
          return CustomResponse(500, 'Couldn\'t add an assignee.', { formError: 'Database error.' });
        });
    }
    if (type === 'Review') {
      return await entry.addReviewer(assign)
        .then(() => {
          return CustomResponse(200, 'Successfully added a reviewer.');
        })
        .catch(() => {
          return CustomResponse(500, 'Couldn\'t add a reviewer.', { formError: 'Database error.' });
        });
    }
    return CustomResponse(400, 'Wrong type.', { formError: 'Invalid payload input.' });
  }

  async removeUserFromEntry(id: string, userId: string, type: string): Promise<CustomResponseType> {
    const entry = await db.SprintEntry.findByPk(id);

    if (entry) {
      const user = await db.User.findByPk(userId);

      if (user) {
        if (type === 'Assign') {
          return await entry.removeAssign(user)
          .then(() => CustomResponse(200, 'Successfully removed assignee.'))
          .catch(() => CustomResponse(500, 'Coouldn\'t delete assignee.', { formError: 'Database error.' }));
        }
        if (type === 'Review') {
          return await entry.removeReviewer(user)
          .then(() => CustomResponse(200, 'Successfully removed reviewer.'))
          .catch(() => CustomResponse(500, 'Coouldn\'t delete reviewer.', { formError: 'Database error.' }));
        }
        return CustomResponse(400, 'Wrong type.', { formError: 'Invalid payload input.' });
      }
      return CustomResponse(400, 'User doesn\'t exist.', { formError: 'Invalid payload input.' });
    }
    return CustomResponse(400, 'Entry doesn\'t exist.', { formError: 'Invalid payload input.' });
  }

  // Update existing entry
  async updateEntry(
    id: string,
    points: string,
    priority: string,
    type: string,
    title: string,
    description: string): Promise<CustomResponseType> {
    const entry = await db.SprintEntry.findByPk(id);

    if (!entry) {
      return CustomResponse(404, 'No such entry.', { formError: 'Entry not found.' });
    }

    return await entry.update({
      points,
      priority,
      type,
      title,
      description
    })
      .then(() => {
        return CustomResponse(200, 'Successfully updated an entry.');
      })
      .catch(() => {
        return CustomResponse(500, 'Couldn\'t update an entry.', { formError: 'Database error.' });
      });
  }

  async addEntryToSprint(id: string, sprintId: string) {
    const sprint = await db.Sprint.findByPk(sprintId);

    if (sprint) {
      const entry = await db.SprintEntry.findByPk(id);
      if (entry) {
        return await sprint.addSprintEntry(entry)
        .then(() => CustomResponse(200, 'Successfully added entry to sprint.'))
        .catch(() => CustomResponse(500, 'Database error.', { formError: 'Database error.' }));
      }
      return CustomResponse(400, 'Entry doesn\'t exist.', { formError: 'Invalid payload input.' });
    }

    return CustomResponse(400, 'Sprint doesn\'t exist.', { formError: 'Invalid payload input.' });
  }

  async removeEntryFromSprint(id: string): Promise<CustomResponseType> {
    const entry = await db.SprintEntry.findByPk(id);

    if (entry) {
      if (!entry.sprintId) {
        return CustomResponse(400, 'Entry is not in sprint.', { formError: 'Invalid payload input.' });
      }
      return await entry.update({ sprintId: null })
      .then(() => CustomResponse(200, 'Successfully removed entry from sprint.'))
      .catch(() => CustomResponse(500, 'Couldn\'t remove entry from sprint.', { formError: 'Database error.' }));
    }

    return CustomResponse(400, 'Entry doesn\'t exist.', { formError: 'Invalid payload input.' });
  }

  async addComment(id: string, userId: string, content: string) {
    const comment = await db.Comment.create({
      content,
      userId,
      sprintEntryId: id
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
