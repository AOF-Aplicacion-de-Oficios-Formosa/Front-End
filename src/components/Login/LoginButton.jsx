import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, View, Modal, Button } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import url from '../url';
import { UserContext } from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginButton = ({ auth }) => {
    const navigation = useNavigation();
    const { setUser } = useContext(UserContext)
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function loginAndGetToken(email, password) {
        try {
            const loginUrl = url + '/login'; // Reemplaza con la URL real de tu endpoint de inicio de sesión
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                // La solicitud fue exitosa, analiza el JSON
                const data = await response.json();
    
                if (data && data.token) {
                    // Si 'data' contiene un token, lo retornamos
                    return data.token;
                } else {
                    throw new Error('Token no encontrado en la respuesta');
                }
            } else {
                // Si la respuesta no es exitosa, lanzamos un error
                throw new Error('Error al iniciar sesión: ' + response.status);
            }
        } catch (error) {
            throw error;
        }
    }

    async function obtenerDatosDelUsuarioConToken(token) {
        try {
            const profileUrl = url + '/user/'; // Reemplaza con la URL real de tu endpoint de perfil de usuario
            const response = await fetch(profileUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Agregamos el token en el encabezado de autorización
                },
            });
            const data = await response.json();

            if (response.ok) {
                // Si la respuesta es exitosa, retornamos los datos del usuario
                return data; // Asumiendo que los datos del usuario se encuentran en data
            } else {
                // Si la respuesta no es exitosa, lanzamos un error
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }
    const handleLogin = async () => {
        try {
            // Realizar la solicitud de inicio de sesión y obtener el token
            const token = await loginAndGetToken(auth.email, auth.password); // Reemplaza con tu lógica real

            // Guardar el token en AsyncStorage
            await AsyncStorage.setItem('token', token);

            // Realizar una solicitud adicional para obtener los datos del usuario
            const userData = await obtenerDatosDelUsuarioConToken(token); // Reemplaza con tu lógica real

            // Actualizar los datos del usuario en el contexto
            setUser(userData);

            const login = url + '/login';
            const data = {
                email: auth.email,
                password: auth.password,
            };

            const response = await fetch(login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const res = await response.json();
            if (res.ok) {
                navigation.navigate('profile');
            } else {
                // Mostrar el mensaje de error en el modal
                setErrorMessage(res.msg);
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error de red o del servidor en el modal
            setErrorMessage('Error de red o del servidor');
            setErrorModalVisible(true);
        }
    }

    return (
        <View style={styles.container}>
            {/* Resto del código */}
            <TouchableOpacity
                title="Ingresar"
                onPress={() => handleLogin()}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Ingresar
                </Text>
            </TouchableOpacity>

            {/* Modal de error */}
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
