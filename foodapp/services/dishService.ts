import api from '../api/main';
import {UserData} from './authService';

const postDish = (dish: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    api.post('/dish/create', dish)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const getDishes = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    api.get('dish/dishes')
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        console.error(error);
        reject(error);
      })
  })
}

export const dishService = {
    postDish,
    getDishes
};