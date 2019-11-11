import axios from 'axios';

export const httpRequest = axios.create({
  baseURL: 'http://localhost:3002/api/v1/',
});