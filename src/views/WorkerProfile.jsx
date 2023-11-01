import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, ScrollView, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useRoute } from '@react-navigation/native';
import url from '../components/url';

const WorkerProfile = () => {
    const route = useRoute();
    const { userId, workers, description } = route.params;

    const worker = workers.find((worker) => worker._id === userId);
    const [userData, setUserData] = useState(null);

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
            <View style={styles.textContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        value={userData?.user?.name}
                        editable={false}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        value={userData?.user?.email}
                        editable={false}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        value={description || 'Descripción no disponible'}
                        editable={false}
                    />
                </View>
            </View>
            <ScrollView>
                <View style={styles.imageContainer}>
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
            <TouchableOpacity style={styles.hireButton} onPress={() => onHirePress(userData)}>
                <Text style={styles.buttonText}>Contratar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,76,139,255)',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',

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
        borderRadius: 10,
    },
    textContainer: {
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 5,
        marginLeft: '10@ms',
        marginRight: '10@ms',
        top: -70,
        marginBottom: '-50@ms'
    },
    inputWrapper: {
        borderRadius: 20,
        marginVertical: 5,
        marginLeft: '30@ms',
        marginRight: '20@ms',
    },
    textInput: {
        fontSize: '16@s',
        fontWeight: 'bold',
        marginVertical: '5@s',
        color: 'white',
        fontFamily: 'Product-Sans',
    },
    hireButton: {
        backgroundColor: '#007AFF',
        padding: '10@s',
        borderRadius: '8@s',
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
        top: -70,
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
});

export default WorkerProfile;
