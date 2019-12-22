import { httpRequest } from '../httpRequest';
import { Order } from 'models/types/table';

const project = {
  getProjectList: (
    order: Order,
    orderBy: string,
    page: number,
    rowsPerPage: number,
    search: string,
  ) => {
    return httpRequest.post('project/get_all_user_projects', {
      order,
      orderBy,
      page,
      rowsPerPage,
      search,
    });
  },
};

export { project };
