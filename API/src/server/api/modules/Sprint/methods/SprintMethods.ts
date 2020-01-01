import CustomResponse, { CustomResponseType } from '../../../error/CustomError';
import db from '../../../../database';

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
}

export default SprintMethods;
