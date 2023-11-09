import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Input } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../redux/Slice/userSlice';

const Profile = () => {
    const dispatch = useDispatch()
    const dataUser = useSelector(state => state.user.dataUser);

    console.log("info ", dataUser)

    const getDataUser = async () => {
        await dispatch(GetUser())
    }

    useEffect(() => {
        getDataUser();
    }, [])

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
                            <Image
                                source={require('../../assets/img/WIN_20231101_16_09_20_Pro.jpg')}
                                style={styles.profileImage}
                            />
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
                                value={dataUser.surname}
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
    textInput: {
        fontSize: '16@s',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Product-Sans',
        bottom: 5
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
        fontSize: '13@s',
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Product-Sans'
    },
});

export default Profile;