import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Card } from '@rneui/themed';

const Dates = () => {
    const data = [
        { title: 'Peticion de cita.' },
        { title: 'Peticion de citas.' },
        { title: 'Peticion de cita.' },
        // Agrega más elementos según sea necesario
    ];

    const renderItem = ({ item }) => (
        <Card containerStyle={styles.card}>
            <Card.Title style={styles.text}>{item.title}</Card.Title>
            <Card.Divider />
            <Image source={require('../../assets/img/6274.jpg')} style={styles.image} />
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
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#f7f7f7',
    },
    cardContainer: {
        justifyContent: 'space-between',
        marginTop: '15@ms'
    },
    text: {
        fontFamily: 'Product-Sans',
        fontSize: 20,
        color: 'black',
        borderColor: '#000000',
        marginBottom: '5@ms',
    },
    image: {
        width: '100%',
        height: '50%',
        borderRadius: 20,
        resizeMode: 'cover',
    },
});

export default Dates;
