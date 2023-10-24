import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import { ScaledSheet, s } from 'react-native-size-matters';
import Cards from './Cards';
import CategoryList from '../components/Category/CategoryList';

export default function Home() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/LOGO-AOF-BLANCO.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Bienvenid@</Text>
            <Cards />
            <Image
            source={require('../../assets/img/formosa.png')}
            style={styles.image}/>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(2,76,139,255)',
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    text: {
        fontSize: '30@s',
        color: "#FFFF",
        fontFamily: 'Product-Sans',
        marginTop: '-60@ms'
    },
    text1: {
        fontWeight: 'bold',
        fontSize: '15@s',
        color: "#fffff",
    },
    button: {
        backgroundColor: '#237834',
        borderRadius: '10@s',
        width: '300@s',
        height: '100@vs',
        marginTop: '10@vs',
    },
    button2: {
        backgroundColor: '#f7752f',
        borderRadius: '10@s',
        width: '300@s',
        height: '100@vs',
        marginTop: '10@vs',
    },
    buttonText: {
        fontSize: '30@s',
        fontFamily: 'Product-Sans'
    },
    image: {
        width: '200@s',
        height: '200@vs',
        resizeMode: 'contain',
        marginTop: '-40@ms'
    },
});
