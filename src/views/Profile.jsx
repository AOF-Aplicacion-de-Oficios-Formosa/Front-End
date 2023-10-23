import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import { ScaledSheet } from 'react-native-size-matters';

const Profile = () => {
    const { user } = useContext(UserContext);

    useEffect(() => {
        // Este efecto se ejecutará cuando haya un cambio en el contexto (por ejemplo, cuando se inicie sesión)
        // Puedes realizar acciones adicionales aquí si es necesario
    }, [user]); // El efecto se ejecutará cuando cambie el valor de 'user'

    return (
        <View style={styles.container}>
            {user ? (
                <View>
                    <Text>Nombre: {user.name}</Text>
                    <Text>Correo Electrónico: {user.email}</Text>
                    {/* Mostrar otros datos del usuario */}
                </View>
            ) : (
                <Text>No hay datos de usuario disponibles</Text>
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        top: 100
    }
})

export default Profile;
