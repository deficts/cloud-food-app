import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useAuth, USER_DATA_KEY} from '../store/Auth/Auth';
import {getObject} from '../util/storage';
import global, {primary} from '../styles/global';
import { withDecay } from 'react-native-reanimated';

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
        <View style={styles.imageContainer}>
          <Image source={{uri: user.profileImage}} style={styles.image} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={global.title}>{user.name} </Text>
          <Text style={global.title}>{user.lastName}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{user.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderUserData()}
      <TouchableOpacity
        style={[global.buttonDanger, styles.button]}
        onPress={() => {
          auth.logout();
        }}
      >
          <Text style={[global.textCenter, global.buttonText]}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  imageContainer: {
    alignSelf: 'center',
    borderColor: primary,
    borderWidth: 5,
    borderStyle: 'solid',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: undefined,
    borderRadius: 100,
  },
  textWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5
  },
  text: {
    fontSize: 18
  },
  button: {
    marginTop: 50,
    marginHorizontal: 38
  }
});

export default Settings;
