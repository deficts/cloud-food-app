import api from '../api/main';
import {UserCredentials} from '../store/Auth/Auth';

export type UserData = {
  _id?: number;
  name: string;
  lastName: string;
  email: string;
  profileImage: string;
};

/**
 * Log a user via email and password
 *
 * @param credentials the email and password of the user
 * @returns a promise containing the necessary tokens
 */
const login = (credentials: UserCredentials): Promise<{user: UserData}> => {
  return new Promise((resolve, reject) => {
    api
      .post('/user/login', {
        email: credentials.username.toLowerCase(),
        password: credentials.password,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

 const register = (userData: UserData, password: string): Promise<{user: UserData}> => {
  return new Promise((resolve, reject) => {
    api
      .post('/user/register', {
        email: userData.email.toLowerCase(),
        name: userData.name,
        lastName: userData.lastName,
        profileImage: userData.profileImage,
        password: password,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const authService = {
  login,
  register
};
