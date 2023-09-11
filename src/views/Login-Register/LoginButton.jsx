import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const LoginButton = ({ handleLogin }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                title="Ingresar"
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Ingresar
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
        width: 150, // No es necesario usar '@s' aquí
        justifyContent: 'center', // Puedes quitar esto si usas solo alignItems: 'center'
        alignItems: 'center',
        marginTop: '30@s'
    },
    buttonText: {
        fontSize: 16, // No es necesario usar '@ms' aquí
        fontWeight: 'bold',
        color: 'white',
        padding: 10, // No es necesario usar '@s' aquí
    },
});

export default LoginButton;
