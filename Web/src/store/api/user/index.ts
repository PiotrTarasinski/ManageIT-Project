import { httpRequest } from '../httpRequest';

const user = {
  signIn: (email: string, password: string) => {
    return httpRequest.post('auth/login', {
      email: email,
      password: password,
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
};

export { user };
