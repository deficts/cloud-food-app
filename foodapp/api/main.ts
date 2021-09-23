import Axios from 'axios';

const api = Axios.create({
  baseURL: 'https://p1no9yp40d.execute-api.us-east-1.amazonaws.com/dev/api',
});

export const setToken = (token: string) => {
  api.defaults.headers.common.access_token = token;
};

export default api;
