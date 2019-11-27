import { UserState } from 'models/types/store';
import jwt from 'jsonwebtoken';

function getUserDataFromToken(): UserState {
  const token = window.localStorage.getItem('acces_token');
  const userData: any = token ? jwt.decode(token) : null;
  return { isAuth: token ? true : false, ...userData };
}

export { getUserDataFromToken };
