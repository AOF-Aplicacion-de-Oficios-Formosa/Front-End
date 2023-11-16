import { View, Text, Systrace, Image } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { Card } from '@rneui/themed';

const Dates = () => {

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Card containerStyle={styles.card}>
                    <Card.Title style={styles.text}>Peticion de cita.</Card.Title>
                    <Card.Divider></Card.Divider>
                    <Image source={require('../../assets/img/calendario.png')} style={styles.image} />
                </Card>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,76,139,255)',
    },
    card: {
        marginTop: '110@ms',
        marginRight: '10@ms',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        alignContent: 'center',
        color: '#FFFFF',
    },
    cardContainer: {
        marginTop: '50@ms',
    },
    text: {
        fontFamily: 'Product-Sans',
        fontSize: 20,
        color: 'black',
        borderColor: '#000000',
        marginBottom: '5@ms'
    },
    image: {
        width: '320@ms',
        height: '150@vs',
        resizeMode: 'contain',
        marginTop: '-10@ms',
        marginVertical: '-0@vs',
        borderRadius: 20,
    },
})

export default Dates;