import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';

const Profile = () => {

    const user = useSelector((state) => state.user)
    return (
        <View style={styles.container}>
            {user ? (
                <View>
                    <Text>Nombre: {user.name}</Text>
                    <Text>Apellido: {user.surname}</Text>
                    <Text>Correo Electrónico: {user.email}</Text>
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
