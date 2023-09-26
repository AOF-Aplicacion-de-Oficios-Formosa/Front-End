import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const RegisterButton = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity
                title="Registrar"
                onPress={() => { navigation.navigate('register2') }}
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
