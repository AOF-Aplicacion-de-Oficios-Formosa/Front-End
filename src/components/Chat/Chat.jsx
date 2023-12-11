import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const socketRef = useRef(null);

    const getDataUser = useCallback(async () => {
        await dispatch(GetUser());
    }, [dispatch]);

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);

    useEffect(() => {
        if (dataUser && !socketRef.current) {
            // Crear y conectar el socket cuando hay un usuario y aún no existe el socket
            const newSocket = io(url, {
                query: { userId: dataUser._id }
            });

            newSocket.on('new message', (newMessage) => {
                dispatch(receiveMessage(newMessage));
            });

            socketRef.current = newSocket;

            return () => {
                // Desconectar el socket cuando el componente se desmonta
                newSocket.disconnect();
            };
        }
    }, [dataUser, dispatch]);

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
                keyExtractor={(item) => item._id ? item._id.toString() : ''}
                renderItem={({ item }) => {
                    console.log('Mensaje:', item);
                    const messageText = typeof item.message === 'object' ? item.message.message || '' : item.message;
                    return (
                        <View>
                            <Text style={item.fromUserId === dataUser._id ? styles.sentMessage : styles.receivedMessage}>
                                {messageText}
                            </Text>
                        </View>
                    );
                }}
            />
            <TextInput value={messageText} onChangeText={setMessageText} placeholder='Escribe' placeholderTextColor={'white'} />
            <Button title="Enviar" onPress={handleSendMessage} />
        </View>
    );
}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,76,139,255)'
    },
    text: {
        color: 'white'
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C5',
        padding: 8,
        marginVertical: 4,
        borderRadius: 8,
        fontSize: 20,
        marginRight: 10
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E0E0E0',
        padding: 8,
        marginVertical: 4,
        borderRadius: 8,
        fontSize: 20,
        marginLeft: 10
    },

});

export default Chat;