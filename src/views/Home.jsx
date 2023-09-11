import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import { ScaledSheet } from 'react-native-size-matters';
import Cards from './Cards';

export default function Home() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/LOGO-AOF-BLANCO.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Bienvenid@ a Oficios Formosa!</Text>
            <ScrollView>
                <View style={styles.card}>
                    <Cards />
                </View>
            </ScrollView>


        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(2,96,182,1)',
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
