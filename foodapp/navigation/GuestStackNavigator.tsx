import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';

const GuestStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

export default GuestStackNavigator;
