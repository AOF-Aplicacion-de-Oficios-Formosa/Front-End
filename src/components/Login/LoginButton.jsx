import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/Slice/userSlice';

const LoginButton = ({ auth }) => {
    const navigation = useNavigation();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const data = {
                email: auth.email,
                password: auth.password,
            };
            const response = await dispatch(LoginUser(data));

            if (response && response.payload && response.payload.ok) {
                // Inicio de sesión exitoso
                navigation.navigate('profile');
            } else {
                // Mostrar el mensaje de error en el modal
                const errorMsg = response && response.payload && response.payload.error || 'Intente de nuevo';
                setErrorMessage(errorMsg);
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error de red o del servidor en el modal
            setErrorMessage('Error de red o del servidor');
            setErrorModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                title="Ingresar"
                onPress={() => handleLogin()}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={errorModalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{errorMessage}</Text>
                        <TouchableOpacity
                            title="Cerrar"
                            onPress={() => setErrorModalVisible(false)}
                            style={styles.button2}
                        >
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        marginTop: '30@s'
    },
    button2: {
        backgroundColor: 'black',
        borderRadius: 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20@ms',
        borderRadius: '10@ms',
        alignItems: 'center',
    },
    modalText: {
        fontSize: '18@ms',
        marginBottom: '20@ms',
        textAlign: 'center',
    },
});

export default LoginButton;
