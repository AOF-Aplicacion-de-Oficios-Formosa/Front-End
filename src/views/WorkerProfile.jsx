import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, ScrollView, Text, Modal } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Input } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import url from '../components/url';

const WorkerProfile = () => {
    const route = useRoute();
    const { userId, workers, description, category } = route.params;
    const worker = workers.find((worker) => worker._id === userId);
    const [userData, setUserData] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [desc, setDescription] = useState('');
    const [workerName, setWorkerName] = useState('');
    const [modalCategory, setModalCategory] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        if (category) {
            setModalCategory(category);
        }
    }, [category]);

    // Función para abrir el modal
    const openModal = () => {
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
    };

    const handleHire = () => {
        // Prepara los datos para enviar al endpoint de contratación
        const requestData = {
            category: category?.name, // Reemplaza con la categoría real
            nombreCliente: userData?.user?.name, // Nombre del cliente
            emailCliente: 'tu_correo@gmail.com', // Correo del cliente
            mailWorker: userData?.user?.email, // Correo del trabajador
            descripcionServicio: desc, // Descripción del servicio
            fecha: selectedDate, // Fecha preferida, si aplicable
        };

        // Realiza una solicitud al endpoint /contratar para enviar los datos
        fetch(url + '/contratar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Respuesta del servidor:', data);
            })
            .catch((error) => {
                console.error('Error en la solicitud:', error);
            });
    };

    useEffect(() => {
        if (worker && worker.user) {
            const userId = worker.user._id;
            async function fetchUserData() {
                try {
                    const response = await fetch(url + `/user/${userId}`, {
                        method: 'GET',
                    });

                    if (!response.ok) {
                        throw new Error('La solicitud no fue exitosa. Código de estado: ' + response.status);
                    }

                    const data = await response.json();
                    setUserData(data);
                    const name = data.user?.name || 'Nombre no disponible';
                    setWorkerName(name); // Establecer el nombre del trabajador
                } catch (error) {
                    console.error('Hubo un error:', error);
                }
            }

            fetchUserData();
        }
    }, [worker]);



    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/img/8692.jpg')}
                    style={styles.image}
                />
            </View>
            <View style={styles.profileImageContainer}>
                <View style={styles.profileImageCircle}>
                    <Image
                        source={require('../../assets/img/WIN_20231101_16_09_20_Pro.jpg')}
                        style={styles.profileImage}
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <Input
                        value={userData?.user?.name}
                        editable={false}
                        inputStyle={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        value={userData?.user?.email}
                        editable={false}
                        inputStyle={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        value={description || 'Descripción no disponible'}
                        editable={false}
                        inputStyle={styles.input}
                        multiline
                    />
                </View>
            </View>
            <ScrollView>
                <View style={styles.imageContainer2}>
                    <Image
                        source={require('../../assets/img/64616.jpg')}
                        style={styles.workImage}
                    />
                    <Image
                        source={require('../../assets/img/64616.jpg')}
                        style={styles.workImage}
                    />
                </View>
            </ScrollView>
            <View style={styles.content}>
                <TouchableOpacity style={styles.hireButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Contratar</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Contratar a {workerName}</Text>
                        <Text style={styles.modalTitle}>Categoría: {modalCategory ? modalCategory.name : 'Categoría no disponible'}</Text>
                        <Input
                            value={userData?.user?.email || 'Correo no disponible'}
                            editable={false}
                            label={<Text style={styles.labelStyle}>Email del destinatario:</Text>}
                            style={styles.emailInput}
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                        />
                        <Input
                            label={<Text style={styles.labelStyle}>Fecha preferida:</Text>}
                            style={styles.descriptionInput}
                            placeholder="DD-MM-AA"
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            inputMode='tel'
                            onChangeText={(text) => setSelectedDate(text)}
                            value={selectedDate}
                        />
                        <Input
                            style={styles.descriptionInput}
                            placeholder="Ej: Necesito resolver un problema de gotera."
                            onChangeText={(text) => setDescription(text)}
                            value={desc}
                            label={<Text style={styles.labelStyle}>Describa brevemente el servicio que requiere:</Text>}
                            multiline
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleHire}>
                                <Text style={styles.modalButtonText}>Contratar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,76,139,255)',
        fontFamily: 'Product-Sans'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageContainer2: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        elevation: '5@s',
    },
    image: {
        width: '350@s',
        height: '200@s',
        marginTop: '25@s',
        borderRadius: '8@s',
    },
    workImage: {
        width: '250@s',
        height: '120@s',
        marginBottom: '10@s',
        borderRadius: '10@s',
    },
    inputWrapper: {
        borderRadius: '20@s',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: '5@s',
        marginLeft: '10@ms',
        marginRight: '10@ms',
        top: '-80@s',
        marginBottom: '-70@s',

    },
    textInput: {
        fontSize: '16@s',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Product-Sans',
        bottom: 5
    },
    hireButton: {
        backgroundColor: 'black',
        borderRadius: '25@s',
        width: '150@s',
        height: '40@s',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: '14@s',
        fontWeight: 'bold',
    },
    profileImageContainer: {
        alignItems: 'center',
        position: 'relative',
        top: '-80@s',
    },
    profileImageCircle: {
        width: '120@s',
        height: '120@s',
        borderRadius: '60@s',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: '100@s',
        height: '100@s',
        borderRadius: '60@s',
    },
    input: {
        flex: 1,
        color: 'white',
        fontFamily: 'Product-Sans',
        fontSize: '15@s',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '45@vs',
        width: '300@s',
        margin: '10@ms',
        marginLeft: '25@s',
        padding: '10@ms',
        marginBottom: '-5@s',
    },
    content: {
        padding: '5@ms',
        borderRadius: '10@ms',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '85%',

    },
    modalTitle: {
        fontSize: '17@s',
        fontWeight: 'bold',
        marginBottom: '5@s',
        fontFamily: 'Product-Sans'
    },
    descriptionInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: '10@ms',
        marginBottom: '10@s',
        fontSize: 15,
        fontFamily: 'Product-Sans',
    },
    emailInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: '5@s',
        padding: '10@ms',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Agrega el color de fondo deseado
        color: 'gray',
        fontSize: 15,
        fontFamily: 'Product-Sans'
    },
    labelStyle: {
        fontSize: '13@s',
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Product-Sans'
    },
    modalButton: {
        backgroundColor: 'rgba(2,76,139,255)',
        borderRadius: '25@s',
        width: '120@s',
        height: '40@s',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: '14@s',
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default WorkerProfile;