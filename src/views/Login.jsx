import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import EmailInput from '../components/Login/EmailInput.jsx';
import PasswordInput from '../components/Login/PasswordInput.jsx';
import LoginButton from '../components/Login/LoginButton.jsx';
import Addons from '../components/Login/Addons.jsx';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/img/ISOTIPO-AOF-BLANCO--2.png')} style={styles.img} />
            </View>
            <ScrollView
                keyboardShouldPersistTaps="always"
                contentContainerStyle={styles.scrollContent}
                scrollEnabled={false}
            >
                <View style={styles.inputWrapper}>
                    <Text style={styles.text}>Ingrese su correo:</Text>
                    <EmailInput onChangeText={setEmail} />
                    <Text style={styles.text2}>Ingrese su contraseña:</Text>
                    <PasswordInput onChangeText={setPassword} />
                    <Addons />
                </View>
                <LoginButton
                    auth={{ email, password }}
                />
                <View style={styles.inlineTextContainer}>
                    <Text style={styles.noAccountText}>
                        ¿No tienes una cuenta?
                    </Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('register') }}>
                        <Text style={styles.createAccountLink}>
                            Crea una!
                        </Text>
                    </TouchableOpacity>
                </View>
                <Image source={require('../../assets/img/empleo-blanco.png')} style={styles.footer} />
            </ScrollView>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(2,76,139,255)',
    },
    imageContainer: {
        alignItems: 'center',
    },
    img: {
        width: '180@s',
        height: 'undefined',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginBottom: '30@ms',
        marginTop: '65@ms'
    },
    footer: {
        width: '350@s',
        height: '31@vs',
        resizeMode: 'contain',
        marginTop: '50@ms'
    },
    text: {
        marginLeft: '20@ms',
        fontFamily: 'Product-Sans',
        fontSize: 25,
        color: '#FFFF',
        borderColor: '#000000',
        marginTop: '15@ms'
    },
    text2: {
        marginLeft: '20@ms',
        fontFamily: 'Product-Sans',
        fontSize: 25,
        color: '#FFFF',
        borderColor: '#000000',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 10, // Adjust this value as needed
    },
    inputWrapper: {
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 5,
        marginLeft: '10@ms',
        marginRight: '10@ms',
    },
    inlineTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10@ms'
    },
    noAccountText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Product-Sans'
    },
    createAccountLink: {
        color: '#FFCA28',
        textDecorationLine: 'underline',
        marginLeft: 5,
        fontFamily: 'Product-Sans',
        fontSize: 18,
    },
});

export default Login;
