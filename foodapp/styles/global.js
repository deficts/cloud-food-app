   
'use strict';
import { StyleSheet } from 'react-native';
export const primary = "#C386CD";
export const inputBackground = '#EAEAEA';
export const cardBackground = '#F3F3F3';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center' 
    },
    containerTop: {
        flex: 1,
    },
    header: {
        margin: 16,
        fontSize: 30,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        backgroundColor: inputBackground,
        padding: 8,
        borderRadius: 5,
        fontSize: 18
    },
    button: {
        height: 40,
        backgroundColor: primary,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    textCenter: {
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14
    }
});