import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:5050/api',
});

export const setToken = (token: string) => {
  api.defaults.headers.common.access_token = token;
};

export default api;
