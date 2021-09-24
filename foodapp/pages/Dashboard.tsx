import React from 'react';
import { ScrollView } from 'react-native';

import DishCard from '../components/DishCard';

export default function Dashboard() {
  const dishes = [
    {
      image: 'https://www.superama.com.mx/views/micrositio/recetas/images/fiestas-patrias/enchiladas-poblanas/Web_fotoreceta.jpg',
      name: 'Enchiladas suizas',
      price: 90, 
      chefPicture: 'https://depor.com/resizer/aaXNykAG-lhkvXUSVexJwsLKgfo=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/K4UCST7IPZDIVJUUDEOUEYZ6XA.webp',
      chefName: 'Chavo Del Ocho',
      description: 'Enchiladas preparadas bla bla bla bla bla'
    },
    {
      image: 'http://www.comedera.com/wp-content/uploads/2017/08/tacos-al-pastor-receta.jpg',
      name: 'Tacos al pastor',
      price: 50, 
      chefPicture: 'https://pbs.twimg.com/profile_images/991180595710513152/V5O-Z320.jpg',
      chefName: 'Enrique Peña Nieto',
      description: 'Tacos al pastor con bla bla bla bla bla'
    },
    {
      image: 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/03/30/6063031b90a87.r_d.1083-871-0.jpeg',
      name: 'Pizza',
      price: 120, 
      chefPicture: 'https://lawebdelacultura.com/wp-content/uploads/2018/05/76-1.jpg',
      chefName: 'Mario',
      description: 'Pizza con champiñones bla bla bla bla bla'
    }
  ]

  return (
    <ScrollView>
      {dishes.map((d, i) => {
        return (
          <DishCard 
            key={i}
            image={d.image}
            name={d.name}
            price={d.price} 
            chefPicture={d.chefPicture}
            chefName={d.chefName}
            description={d.description} 
          />
        )
      })} 
    </ScrollView>
  );
}
