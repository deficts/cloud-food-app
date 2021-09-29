import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Dashboard from '../pages/Dashboard';
import MyDishes from '../pages/MyDishes';
import Settings from '../pages/Settings';

const UserDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Mis platillos" component={MyDishes} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default UserDrawerNavigator;
