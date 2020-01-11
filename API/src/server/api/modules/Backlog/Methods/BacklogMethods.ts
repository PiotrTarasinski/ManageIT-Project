import { CustomResponseType } from '../../../error/CustomError';
import db from '../../../../database';

interface BacklogResponse {
  response: CustomResponseType;
  accessToken?: string;
}

class BacklogMethods {
  async getProjectBacklog(projectId: string) {

    return await db.Backlog.findAll({
      where: {
        projectId
      },
      include: [
        {
          model: db.User,
          as: 'user'
        }
      ],
      order: [
            ['createdAt', 'DESC']
      ]
    });
  }
}

export default BacklogMethods;
