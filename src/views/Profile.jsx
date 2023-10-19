import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { UserContext } from '../context/UserContext'; // Asegúrate de que la ubicación del import sea correcta

const Profile = () => {
    const { myState, setState } = useContext(UserContext); // Accede a los valores del contexto

    return (
        <View>
            <Text>Valor en myState: {myState}</Text>
        </View>
    );
};

export default Profile;