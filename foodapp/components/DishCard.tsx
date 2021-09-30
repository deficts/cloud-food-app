import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import global, { cardBackground, primary } from '../styles/global'
import {dishService} from '../services/dishService';

interface Props {
    id: string,
    image: string,
    name: string,
    price: number, 
    chefPicture: string,
    chefName: string,
    description: string,
    isMine: boolean
}

const DishCard: React.FC<Props> = (props) => {

    const deleteDish = async (): Promise<void> => {
        await dishService
            .deleteDish(props.id)
            .catch((error:any) => {
                console.error("Error at deleteDish: "+error.message)
            });
    };
    
    return (
        <View style={styles.dishCard}>
            <Image style={styles.foodImage} source={{uri: props.image}}/>
            <View style={styles.rowContainer}>
                <Text style={global.subtitle}> { props.name } </Text>
                <Text style={[global.text, styles.price]}> $ { props.price.toFixed(2) } MXN </Text>
            </View>
            <View style={styles.rowContainer}>
                <Image style={styles.profileImage} source={{uri: props.chefPicture}}/>
                <Text style={[global.text, styles.userName]}> { props.chefName } </Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={global.text}> { props.description } </Text>
            </View>
            { props.isMine && 
                <TouchableOpacity onPress={deleteDish} style={[global.buttonDanger, styles.input]}>
                    <Text style={[global.textCenter, global.buttonText]}>Eliminar</Text>
                </TouchableOpacity>
            }
            { !props.isMine && 
                <TouchableOpacity style={[global.button, styles.input]}>
                    <Text style={[global.textCenter, global.buttonText]}>Pedir</Text>
                </TouchableOpacity>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    dishCard: {
        flex: 0,
        flexDirection: 'column',
        backgroundColor: cardBackground,
        marginHorizontal: 30,
        marginVertical: 15,
        borderRadius: 5,
    },
    foodImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 20
    },
    rowContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 15
    },
    input: {
        margin: 15
    },
    userName: {
        marginLeft: 9
    },
    price: {
        marginLeft: 'auto',
        color: primary
    },
});

export default DishCard