import * as React from 'react'
import {Text, TouchableOpacity} from 'react-native';
import { ScaledSheet} from 'react-native-size-matters';
import {Entypo} from '@expo/vector-icons'

export default function CameraButtons({title, onPress, icon, color}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo
            name={icon}
            size={28}
            color={color ? color: '#f1f1f1'}/>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}


const styles = ScaledSheet.create({
    button: {
        height: '40@vs',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#f1f1f1',
        marginLeft: '10@ms'
    }
})
