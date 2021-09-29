import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native';
import DishCard from '../components/DishCard';
import {dishService} from '../services/dishService';
import {USER_DATA_KEY} from '../store/Auth/Auth';
import {getObject} from '../util/storage';

export default function Dashboard() {
  const [dishes, setDishes] = useState<any[]>([]);

  const getDishes = async (userID:string) => {
    dishService
      .getDishes()
      .then(response => {
        let dishes = response.dishes
          .filter((d:any) => d.user._id != userID)
          .map((d:any) => {
            return {
              id: d._id,
              image: d.image,
              name: d.name,
              price: d.price, 
              chefPicture: d.user.profileImage,
              chefName: `${d.user.name} ${d.user.lastName}`,
              description: d.description
            }
          });
        setDishes(dishes);
      })
      .catch(error => {
        console.error(`Error at getDishes: ${error.message}`)
      })
  }

  useEffect(() => {
    getObject(USER_DATA_KEY).then(_user => {
      getDishes(_user._id);
    });
  }, [])

  return (
    <>
      <ScrollView>
        {dishes.map((d, i) => {
          return (
            <DishCard 
              key={i}
              id={d.id}
              image={d.image}
              name={d.name}
              price={d.price} 
              chefPicture={d.chefPicture}
              chefName={d.chefName}
              description={d.description} 
              isMine={false}
            />
          )
        })} 
      </ScrollView>
    </>
  );
}