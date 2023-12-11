import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Card } from '@rneui/themed';

const Dates = () => {
    const data = [
        {
            title: 'Peticion de cita.',
            status: 'Pendiente',
            user: 'Diego Britos'
        },
        {
            title: 'Peticion de cita.',
            status: 'En Proceso',
            user: 'Nahuel Perez'
        },
        {
            title: 'Peticion de cita.',
            status: 'Finalizado',
            user: 'Marcos Montellano'
        },
        {
            title: 'Peticion de cita.',
            status: 'Pendiente',
            user: 'Micaela Benitez'
        },
    ];

    const renderItem = ({ item }) => (
        <Card containerStyle={styles.card}>
            <Card.Title style={styles.text}>{item.title}</Card.Title>
            <Card.Divider />
            <Image source={require('../../assets/img/6274.jpg')} style={styles.image} />
            <Text style={styles.text2}>Usuario: {item.user}</Text>
            <Text style={styles.text2}>Estado: {item.status}</Text>
        </Card>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // Muestra dos columnas
                columnWrapperStyle={styles.cardContainer}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,76,139,255)',

    },
    card: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#f7f7f7',
        marginLeft: 10,
        marginRight: 10
    },
    cardContainer: {
        justifyContent: 'space-between',
        marginTop: '25@ms'
    },
    text: {
        fontFamily: 'Product-Sans',
        fontSize: 20,
        color: 'black',
        borderColor: '#000000',
        marginBottom: '5@ms',
    },
    text2: {
        fontFamily: 'Product-Sans',
        fontSize: 15,
        color: 'black',
        borderColor: '#000000',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 20,
        resizeMode: 'cover',
    },
});

export default Dates;
