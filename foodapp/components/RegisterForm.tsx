import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {useAuth} from '../store/Auth/Auth';
import global, {primary, inputBackground} from '../styles/global';
import { ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';

export default function RegisterForm() {
  const [profileImage, setProfileImage] = useState<
    string | null
  >(null);
  const [base64, setBase64] = useState<string>('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const selectFile = async () => {
    try {
      launchImageLibrary({mediaType: 'photo', includeBase64: true}, (res: ImagePickerResponse) => {
        if(res.assets?.length){
          console.log(res.assets);
          if(res.assets[0].uri){
            setProfileImage(res.assets[0].uri);
          }
          if(res.assets[0].base64){
            console.log(res.assets[0].base64);
            setBase64(res.assets[0].base64);
          }
        }
      });
    } catch (err) {
      setProfileImage(null);
    }
  };

  const register = async (): Promise<void> => {
    isLoading(true);
    await auth
      .register({email, lastName, name, profileImage: base64}, password)
      .catch(error => {
        isLoading(false);
      });
  };

  return (
    <>
      {/* <Image
                source={profileImage.uri || ''}
            ></Image> */}
      <TouchableOpacity onPress={selectFile}>
        <View style={styles.imageContainer}>
          {!profileImage && (
            <Text style={styles.imageLabel}>Seleccionar imagen</Text>
          )}
          {profileImage && (
            <Image source={{uri: profileImage}} style={styles.image} />
          )}
        </View>
      </TouchableOpacity>

      <TextInput
        placeholder="Nombre"
        style={[global.input, styles.input]}
        onChangeText={text => setName(text)}
        defaultValue={name}
      />

      <TextInput
        placeholder="Apellido"
        style={[global.input, styles.input]}
        onChangeText={text => setLastName(text)}
        defaultValue={lastName}
      />

      <TextInput
        placeholder="Correo electrónico"
        style={[global.input, styles.input]}
        onChangeText={text => setEmail(text)}
        defaultValue={email}
      />

      <TextInput
        secureTextEntry
        placeholder="Contraseña"
        style={[global.input, styles.input]}
        onChangeText={text => setPassword(text)}
        defaultValue={password}
      />

      <TouchableOpacity
        onPress={register}
        style={[global.button, styles.input]}>
        {loading ? (
          <ActivityIndicator color="white"/>
        ) : (
          <Text style={[global.textCenter, global.buttonText]}>Ingresar</Text>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    backgroundColor: inputBackground,
    borderColor: primary,
    borderWidth: 5,
    borderStyle: 'solid',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageLabel: {
    fontSize: 18,
    color: '#A9A9A9',
  },

  image: {
    flex: 1,
    width: '100%',
    height: undefined,
    borderRadius: 100,
  },

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
