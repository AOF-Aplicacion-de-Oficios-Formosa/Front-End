// SurNameInput.js
import React from 'react';
import { Text, View } from 'react-native';
import { Input } from '@rneui/base';
import { ScaledSheet } from 'react-native-size-matters';

const SurNameInput = ({ value, onChangeText }) => {
    return (
        <View style={styles.inputContainer}>
            <Input
                leftIcon={{type: 'material-community', name: 'badge-account-outline', color: "#FFFF", size: 22}}
                placeholder="Apellido(s)"
                value={value}
                onChangeText={onChangeText}
                inputStyle={styles.input}
                placeholderTextColor="white"
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
    },
    input: {
        flex: 1,
        color: 'white',
    },
});

export default SurNameInput;
