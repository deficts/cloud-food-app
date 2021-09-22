import React, {useState} from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import global, {primary, inputBackground} from '../styles/global'

export default function RegisterForm() {
    const [profileImage, setProfileImage] = useState<DocumentPickerResponse[] | null>(null);
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const selectFile = async () => {
        try {
            const res = await DocumentPicker.pick({type: [DocumentPicker.types.images]})
            setProfileImage(res)
            console.log(JSON.stringify(profileImage, null, 2))
        } catch (err) {
            setProfileImage(null)
        }
      };

    return (
        <>
            {/* <Image
                source={profileImage.uri || ''}
            ></Image> */}
            <TouchableOpacity onPress={selectFile}>
                <View style={styles.imageContainer}>
                    { !profileImage && <Text style={styles.imageLabel}>Seleccionar imagen</Text>}
                    { profileImage && <Image source={{uri: profileImage[0].uri }} style={styles.image}/> }
                </View>
            </TouchableOpacity>

            

            <TextInput
                placeholder="Nombre"
                style={[global.input, styles.input]}
                onChangeText={text => setName(text)}
                defaultValue={name}
            ></TextInput>
            
            <TextInput
                placeholder="Apellido"
                style={[global.input, styles.input]}
                onChangeText={text => setLastName(text)}
                defaultValue={lastName}
            ></TextInput>
            
            <TextInput
                placeholder="Correo electrónico"
                style={[global.input, styles.input]}
                onChangeText={text => setEmail(text)}
                defaultValue={email}
            ></TextInput>
             
            <TextInput
                secureTextEntry
                placeholder="Contraseña"
                style={[global.input, styles.input]}
                onChangeText={text => setPassword(text)}
                defaultValue={password}
            ></TextInput>

            <TouchableOpacity onPress={() => console.log("Registrar")} style={[global.button, styles.input]}>
                <Text style={[global.textCenter, global.buttonText]}>Registrarme</Text>
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
        alignItems: 'center'
    },

    imageLabel: {
        fontSize: 18,
        color: '#A9A9A9'
    },

    image: {
        flex: 1,
        width: '100%', 
        height: undefined,
        borderRadius: 100
    },

    inputLabel: {
        marginLeft: 37,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },

    input: {
        marginHorizontal: 37,
        marginBottom: 25
    },
});

