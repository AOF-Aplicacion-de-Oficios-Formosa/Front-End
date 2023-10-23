import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import { ScaledSheet, s } from 'react-native-size-matters';
import Cards from './Cards';
import CategoryList from '../components/Category/CategoryList';

export default function Home() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer} // Mueve las propiedades de estilo aquí
        >
            <Image
                source={require('../../assets/img/LOGO-AOF-BLANCO.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Bienvenid@</Text>
            <Cards />
            <CategoryList />
        </ScrollView>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,96,182,1)',
    },
    contentContainer: { // Estilo para el contenido del ScrollView
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: '30@s',
        color: "#FFFF",
        fontFamily: 'Product-Sans',
        marginTop: '-60@ms'
    },
    image: {
        flex: 1,
        width: '200@s',
        height: '200@vs',
        resizeMode: 'contain',
        marginTop: '-40@ms'
    },
});
