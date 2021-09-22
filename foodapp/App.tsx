import React from 'react';
import { AuthProvider } from './store/Auth/Auth';
import Router from './navigation/Router';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}
