import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import global, {inputBackground, primary} from '../styles/global';

const ComposeDishModal = ({
  title,
  setTitle,
  description,
  setDesc,
  price,
  setPrice,
  closeCallback,
  createDishFunction,
  base64,
  setBase64,
  loading
}: {
  title: string;
  setTitle: any;
  description: string;
  setDesc: any;
  price: string;
  setPrice: any;
  base64: string;
  setBase64: any;
  closeCallback: any;
  createDishFunction: any;
  loading: boolean;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const selectFile = async () => {
    try {
      launchImageLibrary(
        {mediaType: 'photo', includeBase64: true},
        (res: ImagePickerResponse) => {
          if (res.assets?.length) {
            console.log(res.assets);
            if (res.assets[0].uri) {
              setImage(res.assets[0].uri);
            }
            if (res.assets[0].base64) {
              console.log(res.assets[0].base64);
              setBase64(res.assets[0].base64);
            }
          }
        },
      );
    } catch (err) {
      setImage(null);
    }
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.modalContainer}>
        <View style={styles.buttonBar}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              closeCallback();
            }}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              createDishFunction();
            }}>
            {
              loading ? 
              <ActivityIndicator></ActivityIndicator> :
              <Text style={styles.saveButtonText}>Guardar</Text> 
            }
          </TouchableOpacity>
        </View>
        <Text style={global.header}>Platillo</Text>

        <TouchableOpacity onPress={selectFile}>
          <View style={styles.imageContainer}>
            {!image && (
              <Text style={styles.imageLabel}>Seleccionar imagen</Text>
            )}
            {image && (
              <Image source={{uri: image}} style={styles.image} />
            )}
          </View>
        </TouchableOpacity>

        <Text style={styles.modalText}>Título</Text>
        <TextInput
          style={global.input}
          onChangeText={text => setTitle(text)}
          defaultValue={title}
        />
        <Text style={styles.modalText}>Descripción</Text>
        <TextInput
          style={global.input}
          onChangeText={text => setDesc(text)}
          defaultValue={description}
        />
        <Text style={styles.modalText}>Precio</Text>
        <TextInput
          style={global.input}
          onChangeText={text => setPrice(text)}
          defaultValue={price}
        />
      </View>
    </View>
  );
};

ComposeDishModal.defaultProps = {
  title: '',
  description: '',
  visible: true,
  task: {},
  isEditing: false,
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 700,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  saveButton: {
    padding: 16,
  },
  saveButtonText: {
    fontSize: 18,
    color: primary,
  },
  cancelButton: {
    padding: 16,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'grey',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignSelf: 'center',
    backgroundColor: inputBackground,
    borderColor: primary,
    borderWidth: 5,
    borderStyle: 'solid',
    width: 200,
    height: 200,
    borderRadius: 10,
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
    borderRadius: 10,
  },
});

export default ComposeDishModal;
