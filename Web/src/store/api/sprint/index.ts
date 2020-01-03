import { httpRequest } from '../httpRequest';

const sprint = {
  getSprint: (id: string) => {
    return httpRequest.post('sprint', {
      id,
    });
  },
};

export { sprint };
