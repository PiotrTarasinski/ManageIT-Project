import { httpRequest } from '../httpRequest';
import { orderTypes } from 'models/enums/orderTypes';

const project = {
  getProjectList: (
    order: orderTypes,
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
