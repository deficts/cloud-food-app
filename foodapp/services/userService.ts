import api from '../api/main';
import {UserData} from './authService';

const getUserData = (): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    api.get('/User')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const userService = {
    getUserData,
};