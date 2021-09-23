import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {useAuth, USER_DATA_KEY} from '../store/Auth/Auth';
import {getObject} from '../util/storage';

const Settings = () => {
  const [user, setUser] = useState({
    name: 'usuario',
    lastName: 'last',
    email: 'usuario@mail.com',
    profileImage: 'test',
  });
  const auth = useAuth();

  useEffect(() => {
    getObject(USER_DATA_KEY).then(_user => {
      setUser(_user);
      console.log(user);
    });
  }, []);

  const renderUserData = () => {
    return (
      <View>
        <Image source={{uri: user.profileImage}} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Nombre: {user.name}</Text>
          <Text style={styles.text}>Apellido: {user.lastName}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      {renderUserData()}
      <Button
        color="red"
        title="Cerrar Sesión"
        onPress={() => {
          auth.logout();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 16
  },
  textWrapper: {
    margin: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 4
  },
});

export default Settings;
