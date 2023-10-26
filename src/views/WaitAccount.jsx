import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const WaitAccount = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image style={styles.img} source={require('../../assets/img/image-removebg-preview.png')} />
            </View>
            <View>
                <Text style={styles.text}>Te avisaremos por correo cuando tu cuenta esté habilitada!</Text>
            </View>
            <View>
                <TouchableOpacity
                    title="Volver al inicio"
                    onPress={() => navigation.navigate('home')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Volver al Inicio
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: 'rgba(2,76,139,255)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        width: '80%'
    },
    img: {
        width: '180@s',
        height: 'undefined',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginBottom: '30@ms',
        marginTop: '65@ms',
    },
    text: {
        marginLeft: '20@ms',
        fontFamily: 'Product-Sans',
        fontSize: 45,
        color: '#FFFF',
        borderColor: '#000000',
        marginTop: '5@ms',
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 20,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30@s'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
    },
});

export default WaitAccount;
