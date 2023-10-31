import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useRoute } from '@react-navigation/native';
import url from '../components/url';

const WorkerProfile = () => {
    const route = useRoute();
    const { user } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/img/8692.jpg')} // Cambia esta imagen según tus necesidades
                    style={styles.image}
                />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.name}>{user.email}</Text>
            {/* Puedes mostrar más información del usuario aquí si es necesario */}
            <TouchableOpacity style={styles.hireButton} onPress={() => onHirePress(user)}>
                <Text style={styles.buttonText}>Contratar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
const onHirePress = (userData) => {
    console.log('Contratando al trabajador:', userData);
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,76,139,255)',
    },
    name: {
        fontSize: '16@s',
        fontWeight: 'bold',
        marginBottom: '10@s',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Product-Sans'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        width: '350@s',
        height: '200@s',
        marginTop: '25@s',
        borderRadius: '8@s'
    },
    workImage: {
        width: '100@s',
        height: '100@s',
    },
    hireButton: {
        backgroundColor: '#007AFF',
        padding: '10@s',
        borderRadius: '8@s',
        marginTop: '10@s',
    },
    buttonText: {
        color: 'white',
        fontSize: '14@s',
        fontWeight: 'bold',
    },
});

export default WorkerProfile;
