import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, ScrollView, Text, Modal } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Input } from '@rneui/themed';
import { useRoute, useNavigation } from '@react-navigation/native';
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
    const navigation = useNavigation()

    useEffect(() => {
        if (category) {
            setModalCategory(category);
        }
    }, [category]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
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
                        throw new Error('La solicitud no fue exitosa');
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
                <TouchableOpacity
                    style={styles.hireButton}
                    onPress={() => {
                        navigation.navigate('chat', {
                            userId: userId,
                            worker: worker,
                            workerName: workerName,
                        });
                    }}
                >
                    <Text style={styles.buttonText}>Contratar</Text>
                </TouchableOpacity>
            </View>
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