import React from 'react';
// import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {primary} from './styles/global';
import Login from './pages/login';
import Register from './pages/register';


export default function App() {
  return (
    <Login/>
  )
  // const MyTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     background: '#fff',
  //     primary: primary,
  //   },
  // };

  // const Stack = createNativeStackNavigator();
  // return (
  //   <NavigationContainer theme={MyTheme}>
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Login"
  //         options={{title: 'Iniciar Sesión'}}
  //         component={Login}
  //       ></Stack.Screen>
  //       <Stack.Screen
  //         name="Register"
  //         options={{title: 'Registrarse'}}
  //         component={Register}
  //       ></Stack.Screen>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}