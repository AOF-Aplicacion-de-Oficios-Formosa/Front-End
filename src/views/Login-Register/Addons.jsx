import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';

const Addons = () => {
    const [checked, setChecked] = useState(true);
    const toggleCheckbox = () => setChecked(!checked);

    return (
        <View>
            <CheckBox
                checked={!checked}
                onPress={toggleCheckbox}
                title="Recordarme"
                iconType="material-community"
                checkedIcon="checkbox-marked"
                containerStyle={styles.checkbox}
                size={25}
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="white"
                textStyle={{ color: 'white', fontFamily: 'Product-Sans' }}
            />
            <TouchableOpacity>
                <Text style={styles.forgotpw}>Olvide mis datos</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = ScaledSheet.create({
    checkbox: {
        borderColor: 'rgba(255, 255, 255, 0)',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        width: '120@s',
        marginLeft: '20@s',
    },
    forgotpw: {
        color: '#ff221f',
        marginLeft: '210@s',
        bottom: '32.5@s',
        fontFamily: 'Product-Sans',
        fontSize: 16,
    },
});

export default Addons;
