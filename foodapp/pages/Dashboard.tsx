import React, {useState, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import ComposeDishModal from '../components/ComposeDishModal';
import DishCard from '../components/DishCard';
import {dishService} from '../services/dishService';
import {USER_DATA_KEY} from '../store/Auth/Auth';
import global, {primary} from '../styles/global';
import {getObject} from '../util/storage';

export default function Dashboard() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [base64, setBase64] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const getDishes = async (userEmail:string) => {
    dishService
      .getDishes()
      .then(response => {
        let dishes = response.dishes
          .filter((d:any) => d.user.email != userEmail)
          .map((d:any) => {
            return {
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
      getDishes(_user.email);
    });
  }, [])

  const createDish = async () => {
    setLoading(true);
    const user = await getObject(USER_DATA_KEY);
    const dish = {
      chefID: user._id,
      price: price,
      name: title,
      description: description,
      base64: base64,
    };

    dishService
      .postDish(dish)
      .then(response => {
        setModalVisible(false);
        setTitle('');
        setPrice('');
        setBase64('');
        setDesc('');
      })
      .catch(error => {
        console.error('Error at creting the dish');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ComposeDishModal
          title={title}
          setTitle={setTitle}
          price={price}
          setPrice={setPrice}
          description={description}
          setDesc={setDesc}
          base64={base64}
          setBase64={setBase64}
          closeCallback={() => {
            setModalVisible(false);
            setTitle('');
            setPrice('');
            setBase64('');
            setDesc('');
          }}
          createDishFunction={createDish}
          loading={loading}
        />
      </Modal>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={[global.header, {color: 'white'}]}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: primary,
    borderRadius: 100
  },
});
