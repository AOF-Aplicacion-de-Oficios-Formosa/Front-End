import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { Image } from 'react-native'
import { ScaledSheet, s } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const Cards = () => {

    const navigation = useNavigation()

    return (
        <View>
            <Card
                containerStyle={styles.card}>
                <Card.Title>BUSCAR UN OFICIO!</Card.Title>
                <Card.Divider />
                <Image
                    style={styles.image}
                    source={require('../../assets/img/oficios2.jpg')}
                />
                <Text style={styles.text}>
                    Aquí podrás encontrar distintos tipos de oficios, según su categoría.
                </Text>
                <Button
                    onPress={() => { navigation.navigate('login') }}
                    icon={
                        <Icon name="search" type='font-awesome' color="#ffffff" iconStyle={styles.icon}
                        />
                    }
                    buttonStyle={{ borderRadius: 15 }}
                    title="BUSCAR"
                />
            </Card>
            <Card
                containerStyle={styles.card}>
                <Card.Title>OFRECER UN OFICIO!</Card.Title>
                <Card.Divider />
                <Image
                    style={styles.image}
                    source={require('../../assets/img/oficios_mujeres.jpg')}
                />
                <Text style={styles.text}>
                    Ofrece los servicios en los cuales eres especialista.
                </Text>
                <Button
                    onPress={() => { navigation.navigate('login') }}
                    icon={
                        <Icon name="bullhorn" type='font-awesome' color="#ffffff" iconStyle={styles.icon}
                        />
                    }
                    buttonStyle={{ borderRadius: 15 }}
                    title="OFRECER"
                />
            </Card>
        </View>

    )
}

const styles = ScaledSheet.create({
    card: {
        marginRight: '10@ms',
        borderRadius: 20,
        alignContent: 'center',
        color: '#FFFFF'
    },
    icon: {
        marginRight: '5@ms',
    },
    image: {
        width: '320@ms',
        height: '150@vs',
        resizeMode: 'contain',
        marginTop: '-10@ms',
        marginVertical: '-0@vs',
        borderRadius: 20,
    },
});


export default Cards;
