import axios from 'axios';

export const httpRequest = axios.create({
  baseURL: 'http://localhost:3002/api/v1/',
  headers: { Authorization: `${window.localStorage.getItem('acces_token')}` },
});

httpRequest.interceptors.response.use(res => {
  const token = res.headers.access_token;
  if (token) {
    window.localStorage.setItem('acces_token', token);
    httpRequest.defaults.headers['Authorization'] = token;
  }
  return res;
});
