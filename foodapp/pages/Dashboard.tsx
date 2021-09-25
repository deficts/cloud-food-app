import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import ComposeDishModal from '../components/ComposeDishModal';
import {dishService} from '../services/dishService';
import {USER_DATA_KEY} from '../store/Auth/Auth';
import global, {primary} from '../styles/global';
import {getObject} from '../util/storage';

export default function Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [base64, setBase64] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const createDish = async () => {
    setLoading(true);
    const user = await getObject(USER_DATA_KEY);
    const dish = {
      chefID: user._id,
      price: price,
      title: title,
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
        console.log('Error at creting the dish');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <View style={global.container} />
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
    borderRadius: 100,
  },
});
