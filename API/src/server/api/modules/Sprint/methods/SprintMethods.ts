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
  async changeEntryState(sprintId: string, entryId: string, indexFrom: string, indexTo: string, stateFrom: string, stateTo: string): Promise<CustomResponseType> {
    const entryToChange = await db.SprintEntry.findByPk(entryId);
    if (entryToChange) {
      if (entryToChange.state === stateFrom && entryToChange.index === indexFrom) {
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
      const { index, state } = entryToDelete;
      const entries = await db.SprintEntry.findAll({
        where: {
          state,
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
}

export default SprintMethods;
