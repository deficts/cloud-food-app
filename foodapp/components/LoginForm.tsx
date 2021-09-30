import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useAuth, UserCredentials} from '../store/Auth/Auth';
import global from '../styles/global';

export default function LoginForm() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, isLoading] = useState(false);

  const login = async (credentials: UserCredentials): Promise<void> => {
    isLoading(true);
    await auth.login(credentials).catch(error => {
      isLoading(false);
    });
  };

  return (
    <>
      <Text style={styles.inputLabel}>Correo electrónico</Text>
      <TextInput
        placeholder="test@info.com"
        style={[global.input, styles.input]}
        onChangeText={text => setEmail(text)}
        defaultValue={email}
      />

      <Text style={styles.inputLabel}>Contraseña</Text>

      <TextInput
        secureTextEntry
        placeholder="************"
        style={[global.input, styles.input]}
        onChangeText={text => setPassword(text)}
        defaultValue={password}
      />
      <TouchableOpacity
        onPress={() => login({username: email, password})}
        style={[global.button, styles.input]}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={[global.textCenter, global.buttonText]}>Ingresar</Text>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    marginLeft: 37,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },

  input: {
    marginHorizontal: 37,
    marginBottom: 25,
  },
});
