import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { Input } from '@rneui/themed';

const PasswordInput = ({ value, onChangeText }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.inputContainer}>
            <Input
                leftIcon={{ type: 'material-icons', name: 'lock-outline', color: "#FFFF", size: 22 }}
                placeholder="Contraseña"
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={!showPassword}
                placeholderTextColor="white"
                inputStyle={{
                    flex: 1,
                    color: 'white',
                    paddingRight: 40,
                }}
            />
            <IconButton
                style={styles.icon}
                icon={showPassword ? 'eye-outline' : 'eye-off-outline'}
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
});

export default PasswordInput;