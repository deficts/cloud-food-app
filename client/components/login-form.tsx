import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

import global from '../styles/global'

export default function LoginForm() {
    return (
        <>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <TextInput
                placeholder="test@info.com"
                style={[global.input, styles.margin]}
                // onChangeText={text => setEmail(text)}
                // defaultValue={email}
            ></TextInput>

            <Text style={styles.inputLabel}>Contraseña</Text>

            <TextInput
                secureTextEntry
                placeholder="************"
                style={[global.input, styles.margin]}
                // onChangeText={text => setPassword(text)}
                // defaultValue={password}
            ></TextInput>
            <TouchableOpacity style={[global.button, styles.margin]}>
                <Text style={[global.textCenter, global.buttonText]}>Ingresar</Text>
            </TouchableOpacity>
        </>
      );
}

const styles = StyleSheet.create({
    inputLabel: {
        marginLeft: 37,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },

    margin: {
        marginHorizontal: 37,
        marginBottom: 25
    },

});

