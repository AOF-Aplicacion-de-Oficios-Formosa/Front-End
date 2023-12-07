import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import url from '../components/url';
import { ScaledSheet } from 'react-native-size-matters';

const ChatScreen = () => {
    const [users, setUsers] = useState([]);
    const dataUser = useSelector((state) => state.user.dataUser);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(url + '/user');
                const result = await response.json();

                // Filtrar el usuario actual de la lista
                const filteredUsers = result.users.filter(user => user._id !== dataUser._id);

                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error);
            }
        };

        fetchUsers();
    }, [dataUser._id]);

    const handleChatPress = (userId) => {
        // Navegar a la pantalla de chat con el usuario seleccionado
        navigation.navigate('chat', { worker: { user: { _id: userId } } });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(user) => user._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleChatPress(item._id)}>
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    }
})

export default ChatScreen;
