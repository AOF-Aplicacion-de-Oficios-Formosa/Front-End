import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { Input } from '@rneui/themed';

const RePasswordInput = ({ value, onChangeText }) => {
    const [repassword, setRePassword] = useState('');
    const [showRePassword, setShowRePassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    return (
        <View style={styles.inputContainer}>
            <Input
                leftIcon={{ type: 'material-icons', name: 'lock-outline', color: "#FFFF", size: 22 }}
                placeholder="******"
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={!showRePassword}
                placeholderTextColor="white"
                inputStyle={styles.input}
            />
            <IconButton
                style={styles.icon}
                icon={showRePassword ? 'eye-outline' : 'eye-off-outline'}
                onPress={togglePasswordVisibility}
                iconColor='white'
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '45@vs',
        width: '300@s',
        margin: '10@ms',
        marginLeft: '25@s',
        padding: '10@ms',
        color: 'white'
    },
    icon: {
        position: 'absolute',
        right: '15@s',
        top: '-3@vs',
        margin: '0@ms'
    },
    input: {
        flex: 1,
        color: 'white',
        paddingRight: 40,
        fontFamily: 'Product-Sans'
    }
});

export default RePasswordInput;