import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const RegisterButton = ({ name, surName, email, password, repassword }) => {
    const navigation = useNavigation();

    const handleRegister = async () => {
        try {
            const url = "http://192.168.217.186:4000/register";
            const data = {
                name: name,
                surName: surName,
                email: email,
                password: password,
                repassword: repassword
            };
            console.log(data);

            const res = await axios.post(url, data);
            console.log("respuesta Registro", res)
            if (res.data.ok === true) {
                console.log('Usuario registrado exitosamente:', res.data);
                // Puedes navegar a la pantalla de inicio de sesión u otra pantalla deseada aquí
                navigation.navigate('login'); // Ejemplo: navegación a la pantalla de inicio de sesión
            } else {
                console.log('Error al registrar usuario:', res.data);
                // Manejo de errores o mostrar un mensaje al usuario
            }
        } catch (error) {
            console.log('Error en la solicitud de registro:', error);
            // Manejo de errores o mostrar un mensaje al usuario
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                title="Registrar"
                onPress={() => handleRegister()} // Invoca la función handleRegister
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Registrar
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 20,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
    },
});

export default RegisterButton;
