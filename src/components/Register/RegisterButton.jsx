import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, Button } from 'react-native'; // Importa Modal y Button
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



const RegisterButton = ({ name, surName, email, password, repassword }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleRegisterSuccess = (serverMessage) => {
        setModalMessage(serverMessage);
        setModalVisible(true);
        // Puedes agregar cualquier otra acción que desees después de un registro exitoso
        navigation.navigate('register2');
    };

    const handleRegisterError = (errorMessage) => {
        setModalMessage(`Error al registrar usuario: ${errorMessage}`);
        setModalVisible(true);
    };

    const handleRegister = async () => {
        try {
            const url = "http://192.168.217.186:4000/register";
            const data = {
                name: name,
                surName: surName,
                email: email,
                password: password,
                repassword: repassword,
            };

            const res = await axios.post(url, data);

            if (res.data.ok) {
                handleRegisterSuccess(res.data.msg);
            } else {
                handleRegisterError(res.data.msg);
            }
        } catch (error) {

            const texto = error.toString()
            const arr = texto.split(" ")
            console.log(arr)
            if (arr[arr.length - 1] === "400") {
                return handleRegisterError("Credenciales inválidas");
            }


            handleRegisterError(error);
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
                        <Button
                            title="Cerrar"
                            onPress={() => setModalVisible(false)}
                        />
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
        backgroundColor: 'white',
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
