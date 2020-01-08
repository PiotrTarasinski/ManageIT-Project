import { httpRequest } from '../httpRequest';

const user = {
  signIn: (email: string, password: string) => {
    return httpRequest.post('auth/login', {
      email,
      password,
    });
  },
  signUp: (name: string, email: string, password: string, confirmPassword: string) => {
    return httpRequest.post('auth/sign_up', {
      name,
      email,
      password,
      confirmPassword,
    });
  },
  setActiveProject: (projectId: string) => {
    return httpRequest.post('auth/set_active_project', {
      id: projectId,
    });
  },
  setActiveSprint: (sprintId: string) => {
    return httpRequest.post('auth/set_active_sprint', {
      sprintId,
    });
  },
};

export { user };
