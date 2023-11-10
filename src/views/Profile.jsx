import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser, LogOutUser } from '../redux/Slice/userSlice';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const dispatch = useDispatch()
    const dataUser = useSelector(state => state.user.dataUser);
    const navigation = useNavigation()

    console.log("info ", dataUser)

    const getDataUser = async () => {
        await dispatch(GetUser())
    }

    useEffect(() => {
        getDataUser();
    }, [])

    const handleLogOut = async () => {
        // Llama a la acción LogOutUser para cerrar la sesión
        await dispatch(LogOutUser());
        navigation.navigate('home')
    };

    return (
        <View style={styles.container}>
            {dataUser ? (
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../assets/img/8692.jpg')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImageCircle}>
                            {dataUser.urlImg ? (
                                <Image
                                    source={{ uri: dataUser.urlImg }}
                                    style={styles.profileImage}
                                    onError={() => console.log('Error al cargar la imagen')}
                                />
                            ) : (
                                <Image
                                    source={require('../../assets/img/3177440.png')}
                                    style={styles.profileImage}
                                />
                            )}
                        </View>
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <Input
                                value={dataUser.name}
                                editable={false}
                                inputStyle={styles.input}
                                label={<Text style={styles.labelStyle}>Nombre:</Text>}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Input
                                value={dataUser.surname || "Sin apellido."}
                                editable={false}
                                inputStyle={styles.input}
                                label={<Text style={styles.labelStyle}>Apellido:</Text>}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Input
                                value={dataUser.email}
                                editable={false}
                                inputStyle={styles.input}
                                label={<Text style={styles.labelStyle}>Email:</Text>}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Input
                                value={dataUser.role}
                                editable={false}
                                inputStyle={styles.input}
                                label={<Text style={styles.labelStyle}>Tu rol en la aplicación es:</Text>}
                            />
                        </View>
                        <View style={styles.content}>
                            <TouchableOpacity onPress={handleLogOut} style={styles.logOutButton}>
                                <Text style={styles.logOutButtonText}>Cerrar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <Text>No hay datos de usuario disponibles</Text>
            )}
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '60@vs',
        width: '300@s',
        margin: '10@ms',
        marginLeft: '25@s',
        padding: '10@ms',
        marginBottom: '-5@s',
    },
    textInput: {
        fontSize: '16@s',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Product-Sans',
    },
    input: {
        flex: 1,
        color: 'white',
        fontFamily: 'Product-Sans',
        fontSize: '15@s',
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
    labelStyle: {
        fontSize: '15@s',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Product-Sans',
        marginTop: '15@ms'
    },
    content: {
        padding: '5@ms',
        alignItems: 'center',
    },
    logOutButton: {
        backgroundColor: 'red',
        borderRadius: '25@s',
        width: '130@s',
        height: '40@s',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logOutButtonText: {
        color: 'white',
        fontSize: '15@s',
        fontWeight: 'bold',
    },
});

export default Profile;