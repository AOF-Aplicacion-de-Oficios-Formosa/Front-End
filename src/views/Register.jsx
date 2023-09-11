import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Input } from '@rneui/base';
import EmailInput from './Login-Register/EmailInput';
import PasswordInput from './Login-Register/PasswordInput';
import RePasswordInput from './Login-Register/RePasswordInput';
import NameInput from './Login-Register/NameInput';
import SurNameInput from './Login-Register/SurNameInput';
import RegisterButton from './Login-Register/RegisterButton';

const Register = () => {
    const [name, setName] = useState('')
    const [surName, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log('Registrando:', { name, surName, email, password });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/LOGO-AOF-BLANCO.png')}
                style={styles.img}
            />
            <ScrollView
                keyboardShouldPersistTaps="always"
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.inputWrapper}>
                    <Text style={styles.text1}>Ingrese su nombre(s)</Text>
                    <NameInput />
                    <Text style={styles.text}>Ingrese su apellido(s)</Text>
                    <SurNameInput />
                    <Text style={styles.text}>Ingrese su correo</Text>
                    <EmailInput />
                    <Text style={styles.text}>Ingrese su contraseña</Text>
                    <PasswordInput />
                    <Text style={styles.text}>Ingrese de nuevo su contraseña:</Text>
                    <RePasswordInput />
                </View>
                <RegisterButton/>
                <Image source={require('../../assets/img/empleo-blanco.png')} style={styles.footer} />
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(2,96,182,1)',
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        height: '45@vs',
        width: '300@s',
        margin: '10@ms',
        marginLeft: '25@s',
        padding: '10@ms',
    },
    input: {
        flex: 1,
        color: 'white',
    },
    img: {
        marginHorizontal: '90@ms',
        width: '180@s',
        height: '100@',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginBottom: '-40@ms'
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
        fontSize: 20,
        color: '#FFFF',
        borderColor: '#000000'
    },
    text1: {
        marginLeft: '20@ms',
        fontFamily: 'Product-Sans',
        fontSize: 20,
        color: '#FFFF',
        borderColor: '#000000',
        marginTop: '15@ms'
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 0, // Adjust this value as needed
    },
    inputWrapper: {
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 5,
        marginLeft: '10@ms',
        marginRight: '10@ms'
    }
});

export default Register;
