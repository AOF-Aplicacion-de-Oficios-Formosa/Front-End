import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageAsync, receiveMessage } from '../../redux/Slice/chatSlice';
import { GetUser } from '../../redux/Slice/userSlice';
import url from '../url';
import { ScaledSheet } from 'react-native-size-matters';
import io from 'socket.io-client';
import { useRoute } from '@react-navigation/native';

const Chat = () => {
    const route = useRoute();
    const { worker } = route.params;
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const [messageText, setMessageText] = useState('');
    const dataUser = useSelector((state) => state.user.dataUser);
    console.log("URL:", url); // Agregar esta línea para verificar la URL

    const socket = io(url, {
        query: { userId: dataUser._id },
    });
    const getDataUser = async () => {
        await dispatch(GetUser())
    }

    useEffect(() => {
        getDataUser();
    }, [])

    useEffect(() => {
        socket.on('chat message', (newMessage) => {
            console.log("New message received:", newMessage);
            dispatch(receiveMessage(newMessage));
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch, socket, dataUser]);

    const handleSendMessage = () => {
        const toUserId = worker.user ? worker.user._id : null;
        console.log("userId:", dataUser._id);
        console.log("workerId:", toUserId);
        console.log("messageText:", messageText);
        dispatch(sendMessageAsync({ fromUserId: dataUser._id, toUserId: toUserId, messageText: messageText }));
        setMessageText('');
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => (item._id ? item._id.toString() : '')}
                renderItem={({ item }) => (
                    <View key={item._id}>
                        <Text style={item.fromUserId === dataUser._id ? styles.sentMessage : styles.receivedMessage}>
                            {item.message}
                        </Text>
                    </View>
                )}
            />
            <TextInput value={messageText} onChangeText={setMessageText} placeholder='Escribe' placeholderTextColor={'white'} />
            <Button title="Enviar" onPress={handleSendMessage} />

        </View>
    );
};


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,76,139,255)'
    },
    text: {
        color: 'white'
    },
    sentMessage: {
        color: 'white',
        alignSelf: 'flex-end', // Alinea el mensaje a la derecha si es enviado por el usuario actual
        backgroundColor: 'blue', // Puedes personalizar el fondo del mensaje enviado
        padding: 8,
        margin: 4,
        borderRadius: 8,
    },

    receivedMessage: {
        color: 'white',
        alignSelf: 'flex-start', // Alinea el mensaje a la izquierda si es recibido
        backgroundColor: 'green', // Puedes personalizar el fondo del mensaje recibido
        padding: 8,
        margin: 4,
        borderRadius: 8,
    },

});

export default Chat;