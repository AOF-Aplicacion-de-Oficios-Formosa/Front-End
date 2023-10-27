import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import EmailInput from '../components/Login/EmailInput';
import PasswordInput from '../components/Login/PasswordInput';
import RePasswordInput from '../components/Register/RePasswordInput';
import NameInput from '../components/Register/NameInput';
import SurNameInput from '../components/Register/SurNameInput';
import RegisterButton from '../components/Register/RegisterButton';
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo } from '@expo/vector-icons';


const Register = () => {
    const [name, setName] = useState('')
    const [surname, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('')
    const [userRole, setUserRole] = useState('');
    const roles = ['Buscar', 'Ofrecer'];


    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/LOGO-AOF-BLANCO.png')}
                style={styles.img}
            />
            <ScrollView
                keyboardShouldPersistTaps="always"
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.inputWrapper}>
                    <Text style={styles.text1}>Ingrese su nombre(s)</Text>
                    <NameInput value={name} onChangeText={setName} />
                    <Text style={styles.text}>Ingrese su apellido(s)</Text>
                    <SurNameInput value={surname} onChangeText={setSurName} />
                    <Text style={styles.text}>Ingrese su correo</Text>
                    <EmailInput value={email} onChangeText={setEmail} />
                    <Text style={styles.text}>Ingrese su contraseña</Text>
                    <PasswordInput value={password} onChangeText={setPassword} />
                    <Text style={styles.text}>Ingrese de nuevo su contraseña</Text>
                    <RePasswordInput value={repassword} onChangeText={setRePassword} />
                    <Text style={styles.text}>Seleccione su rol:</Text>
                    <View style={styles.selectDropdownContainer}>
                        <SelectDropdown
                            data={roles}
                            onSelect={(selectedItem, index) => {
                                setUserRole(selectedItem);
                                console.log(`Rol seleccionado: ${selectedItem}`);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            dropdownStyle={styles.dropdownContainer}
                            buttonStyle={styles.selectDropdown}
                            defaultButtonText="Seleccione una opción"
                            buttonTextStyle={{ fontFamily: 'Product-Sans' }}
                            renderDropdownIcon={() => (
                                <Entypo name={'chevron-small-down'} size={24} color="black" />
                            )} />
                    </View>
                </View>
                <RegisterButton
                    name={name}
                    surname={surname}
                    email={email}
                    password={password}
                    repassword={repassword}
                    userRole={userRole}
                />
                <Image source={require('../../assets/img/empleo-blanco.png')} style={styles.footer} />
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(2,76,139,255)',
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        height: '45@vs',
        width: '300@s',
        margin: '10@ms',
        marginLeft: '25@s',
        padding: '10@ms',
    },
    input: {
        flex: 1,
        color: 'white',
    },
    img: {
        marginLeft: '100@ms',
        marginRight: '100@ms',
        width: '150@s',
        height: '100@',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginBottom: '-40@ms'
    },
    footer: {
        width: '350@s',
        height: '31@vs',
        resizeMode: 'contain',
        marginTop: '5@ms'
    },
    text: {
        marginLeft: '20@ms',
        fontFamily: 'Product-Sans',
        fontSize: 20,
        color: '#FFFF',
        borderColor: '#000000'
    },
    text1: {
        marginLeft: '20@ms',
        fontFamily: 'Product-Sans',
        fontSize: 20,
        color: '#FFFF',
        borderColor: '#000000',
        marginTop: '15@ms'
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 0, // Adjust this value as needed
    },
    inputWrapper: {
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 5,
        marginLeft: '10@ms',
        marginRight: '10@ms',
    },
    selectDropdown: {
        borderRadius: 15,
        width: '130%',
        height: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    dropdownContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    selectDropdownContainer: {
        alignItems: 'center', // Centra horizontalmente
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
        marginLeft: 100,
        marginRight: 100// Espacio entre el texto y el dropdown
    }
});

export default Register;
