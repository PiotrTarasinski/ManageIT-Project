import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import db from '../../../../database';
import { Op } from 'sequelize';
import sequelize = require('sequelize');

interface SprintResponse {
  response: CustomResponseType;
  accessToken?: string;
}

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

  async changeEntryType(sprintId: string, entryId: string, indexFrom: string, indexTo: string, typeFrom: string, typeTo: string) {
    const entryToChange = await db.SprintEntry.findByPk(entryId);
    if (entryToChange) {

      console.log(entryToChange.type, typeFrom);
      if (entryToChange.type === typeFrom && entryToChange.index === indexFrom) {

        const entries = await db.SprintEntry.findAll({
          where: {
            sprintId,
            [Op.or]: [
                { type: typeFrom },
                { type: typeTo }
            ]}
        });
        entries.forEach(async instance => {
          if (instance.type === typeFrom && instance.index > indexFrom) {
            await instance.decrement('index', { by: 1 });
          } else if (instance.type === typeTo && instance.index > indexTo) {
            await instance.increment('index', { by: 1 });
          } else if (instance.id === entryId) {
            instance.update({ index: indexTo, type: typeTo });
          }
        });
        return entries;
      }
    }
    return false;
  }
}

export default SprintMethods;
