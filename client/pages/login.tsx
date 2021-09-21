import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import LoginForm from '../components/login-form'

import global, { primary } from '../styles/global'

export default function Login({navigation}: {navigation: any}) {
    return (
        <View style={global.container}>

            {/* Logo */}
            <View style={styles.logo}/>

            {/* Form    */}
            <LoginForm></LoginForm>

            {/* Register */}
            <View style={styles.registerText}>
                <Text>¿No tienes cuenta?</Text>
                <TouchableOpacity onPress={() => console.log("Registro")}>
                    <Text style={styles.link}>
                        Regístrate
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        backgroundColor: primary,
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 62
    },

    registerText: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    link: {
        color: primary, 
        marginLeft: 5
    }
});
