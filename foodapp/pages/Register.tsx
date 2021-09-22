import React from 'react'
import { View } from 'react-native'
import global from '../styles/global'
import RegisterForm from '../components/RegisterForm'

export default function Register() {
    return (
        <View style={global.container}>
            <RegisterForm></RegisterForm>
        </View>
    )
}
