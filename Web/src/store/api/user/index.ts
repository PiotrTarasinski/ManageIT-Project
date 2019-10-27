import axios from 'axios';

const user = {
  signIn: (email: string, password: string) => {
    return axios.post('http://localhost:3002/api/v1/auth/login', {
      email: email,
      password: password,
    });
  },
  signUp: (name: string, email: string, password: string, confirmPassword: string) => {
    return axios.post('http://localhost:3002/api/v1/auth/sign_up', {
      name,
      email,
      password,
      confirmPassword,
    });
  },
};

export { user };
