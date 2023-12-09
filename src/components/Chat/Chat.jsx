import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageAsync, receiveMessage } from '../../redux/Slice/chatSlice';
import { GetUser } from '../../redux/Slice/userSlice';
import url from '../url';
import { ScaledSheet } from 'react-native-size-matters';
import io from 'socket.io-client';
import { useRoute } from '@react-navigation/native';
import { Input } from '@rneui/themed';

const Chat = () => {
    const route = useRoute();
    const { worker } = route.params;
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const [messageText, setMessageText] = useState('');
    const dataUser = useSelector((state) => state.user.dataUser);
    console.log("URL:", url); // Agregar esta línea para verificar la URL

    // Utiliza useCallback para evitar que la función se cree en cada renderizado
    const getDataUser = useCallback(async () => {
        await dispatch(GetUser());
    }, [dispatch]);

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);

    // Conectar el socket una vez que se ha obtenido el usuario
    const socket = io(url, {
        query: { userId: dataUser._id },
    });

    useEffect(() => {
        const handleConnect = () => {
            console.log('Conectado al servidor de Socket.IO');
        };

        const handleDisconnect = () => {
            console.log('Desconectado del servidor de Socket.IO');
        };

        const handleReconnect = () => {
            console.log('Reconectado al servidor de Socket.IO');
        };

        const handleNewMessage = (newMessage) => {
            console.log('Mensaje entrante:', newMessage);
            dispatch(receiveMessage(newMessage));
        };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('reconnect', handleReconnect);
        socket.on('new message', handleNewMessage);

        // Conectar el socket cuando se monta el componente
        socket.connect();

        // Desconectar el socket cuando se desmonta el componente
        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('reconnect', handleReconnect);
            socket.off('new message', handleNewMessage);
            socket.disconnect();
            console.log('Socket desconectado');
        };
    }, [dispatch, socket, dataUser]);

    const handleSendMessage = () => {
        const toUserId = worker.user ? worker.user._id : null;
        console.log("userId:", dataUser._id);
        console.log("workerId:", toUserId);
        console.log("messageText:", messageText);

        // Enviar el mensaje al servidor
        socket.emit('send message', {
            fromUserId: dataUser._id,
            toUserId: toUserId,
            messageText: messageText,
        });

        setMessageText('');
    };

    let counter = 0; // Contador para claves únicas

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => (item._id ? item._id.toString() : (counter++).toString())}
                renderItem={({ item }) => {
                    console.log('Mensaje:', item);
                    const messageText = typeof item.message === 'object' ? item.message.message || '' : item.message;
                    return (
                        <View key={item._id || counter}>
                            <Text style={item.fromUserId === dataUser._id ? styles.sentMessage : styles.receivedMessage}>
                                {messageText}
                            </Text>
                        </View>
                    );
                }}
            />
            <Input value={messageText} onChangeText={setMessageText} placeholder='Escribe' placeholderTextColor={'white'} />
            <Button title="Enviar" onPress={handleSendMessage} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,76,139,255)',
    },
    sentMessage: {
        color: 'white',
        alignSelf: 'flex-end',
        backgroundColor: 'blue',
        padding: 8,
        margin: 4,
        borderRadius: 8,
    },
    receivedMessage: {
        color: 'white',
        alignSelf: 'flex-start',
        backgroundColor: 'green',
        padding: 8,
        margin: 4,
        borderRadius: 8,
    },
});

export default Chat;
