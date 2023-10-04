import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, ActivityIndicator, Alert, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as LocalAuthentication from 'expo-local-authentication';
import { IconButton } from 'react-native-paper';

const Unlock = ({ navigation }) => {
    const [authenticationStatus, setAuthenticationStatus] = useState('pending');

    useEffect(() => {
        authenticateWithBiometrics();
    }, []);

    const authenticateWithBiometrics = async () => {
        try {
            const isBiometricsAvailable = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();

            if (isBiometricsAvailable) {
                const { success } = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Utilice su huella dactilar o su PIN',
                });
                if (success) {
                    setAuthenticationStatus('success');
                    navigation.replace('home');
                } else {
                    setAuthenticationStatus('failure');
                }
            } else {
                // No hay datos biométricos configurados, navega directamente a 'home'
                navigation.replace('home');
            }
        } catch (error) {
            console.log('Error en la autenticación biométrica:', error);
            setAuthenticationStatus('failure');
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/img/diseno3.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/img/ISOTIPO-CON-LOGOTIPO.png')} style={styles.centeredImage} />
                </View>
                <View style={styles.loadingContainer}>
                    {authenticationStatus === 'pending' && (
                        <ActivityIndicator size="extralarge" color="white" />
                    )}
                    {authenticationStatus === 'failure' && (
                        <View>
                            <Text style={styles.text}>
                                Error en la autenticación biométrica.
                            </Text>
                            <TouchableOpacity>
                                <IconButton
                                    style={styles.icon}
                                    icon={'fingerprint'}
                                    iconColor='#faf7ca'
                                    size={100}
                                    onPress={authenticateWithBiometrics}
                                />
                            </TouchableOpacity>
                            <Text style={styles.text}>
                                Inténtalo nuevamente.
                            </Text>
                        </View>

                    )}
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredImage: {
        width: '200@s',
        height: '200@vs',
        resizeMode: 'contain',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '100@vs', // Añadir un espacio entre la imagen y el indicador
    },
    text: {
        marginLeft: '20@ms',
        fontFamily: 'Product-Sans',
        fontSize: 25,
        color: '#FFFF',
        borderColor: '#000000',
    },
    icon: {
        left: '90@ms',
    },
});

export default Unlock;
