import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useAuth} from '../store/Auth/Auth';
import { primary } from '../styles/global';
import GuestStackNavigator from './GuestStackNavigator';
import UserDrawerNavigator from './UserDrawerNavigator';

const Router = () => {
  const {userData, loading} = useAuth();

  const Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
      primary: primary,
    },
  };

  return (
    <NavigationContainer theme={Theme}>
      {userData ? <UserDrawerNavigator /> : <GuestStackNavigator />}
    </NavigationContainer>
  );
};

export default Router;
