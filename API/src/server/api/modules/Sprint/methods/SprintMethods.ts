import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import db from '../../../../database';
import { Op } from 'sequelize';

class SprintMethods {
  async getSprintEntries(id: string) {
    return await db.Project.findByPk(id, {
      include: [
        {
          model: db.Sprint,
          as: 'activeSprint',
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
                }
              ]
            }
          ]
        }
      ]
    });
  }

  // tslint:disable-next-line:max-line-length
  async changeEntryState(sprintId: string, entryId: string, indexFrom: number | string, indexTo: number | string, stateFrom: string, stateTo: string): Promise<CustomResponseType> {
    const entryToChange = await db.SprintEntry.findByPk(entryId);
    if (entryToChange) {
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
            if (instance.index === indexFrom) {
              await instance.update({ index: indexTo });
            } else if (instance.index <= indexTo && instance.index > indexFrom) {
              await instance.decrement('index', { by: 1 });
            } else if (instance.index >= indexTo && indexFrom > indexTo && instance.index < indexFrom) {
              await instance.increment('index', { by: 1 });
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
            ]}
        });
        entries.forEach(async instance => {
          if (instance.id === entryId) {
            instance.update({ index: indexTo, state: stateTo });
          } else if (instance.state === stateFrom && instance.index > indexFrom) {
            await instance.decrement('index', { by: 1 });
          } else if (instance.state === stateTo && instance.index >= indexTo) {
            await instance.increment('index', { by: 1 });
          }
        });
        return CustomResponse(200, 'Successfully changed state.');
      }
    }
    return CustomResponse(400, 'Invalid payload input.', { formError: 'Either index or state is invalid.' });
  }

  async deleteEntry(id: string) {
    const entryToDelete = await db.SprintEntry.findByPk(id);
    if (entryToDelete) {
      const { index, state, sprintId } = entryToDelete;
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

  // tslint:disable-next-line:max-line-length
  async createEntry(points: string, priority: string, state: string, type: string, title: string, description: string, sprintId: string, sprintName: string) {
    let index = 0;
    let count = 0;
    const entries  = await db.SprintEntry.findAll({
      where: {
        sprintId
      }
    });
    entries.forEach(async instance => {
      if (instance.state === state) {
        index++;
      }
      count++;
    });
    return await db.SprintEntry.create({
      points: Number.parseInt(points, 10),
      priority,
      state,
      type,
      identifier: `${sprintName.substr(0, 3).toUpperCase()}-${count}`,
      title,
      description,
      sprintId,
      index
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  }

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

  // tslint:disable-next-line:max-line-length
  async updateEntry(id: string, points: string, priority: string, type: string, title: string, description: string): Promise<CustomResponseType> {
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
}

export default SprintMethods;
