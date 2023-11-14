import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, Button } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import url from '../url';

const RegisterButton = ({ name, surname, email, password, repassword, userRole }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleRegisterSuccess = (serverMessage) => {
        setModalMessage(serverMessage);
        setModalVisible(true);
        if (userRole === 'Ofrecer') {
            navigation.navigate('register2');
        }
        else {
            navigation.navigate('search')
        }
    };

    const handleRegisterError = (errorMessage) => {
        setModalMessage(`${errorMessage}`);
        setModalVisible(true);
    };

    const handleRegister = async () => {
        try {
            const data = {
                name: name,
                surname: surname,
                email: email,
                password: password,
                repassword: repassword,
                role: userRole
            };
            console.log(data)
            const response = await fetch(url + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Convierte los datos a JSON
            });

            const res = await response.json();

            if (res.ok) {
                handleRegisterSuccess(res.msg);
            } else {
                handleRegisterError(res.error); // Utiliza el error del servidor en lugar de "Credenciales inválidas"
            }
        } catch (error) {
            handleRegisterError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                title="Registrar"
                onPress={() => handleRegister()}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Registrar
                </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity
                            title="Registrar"
                            onPress={() => setModalVisible(false)}
                            style={styles.button2}
                        >
                            <Text style={styles.buttonText}>
                                Cerrar
                            </Text>
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
        marginTop: 10,
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

export default RegisterButton;
