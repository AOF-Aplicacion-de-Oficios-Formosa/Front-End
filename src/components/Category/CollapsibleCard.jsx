import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CollapsibleCard = ({ title }) => {
    const navigation = useNavigation()


    return (
        <View style={styles.card}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{title}</Text>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    title: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontFamily: 'Product-Sans',
    },
});

export default CollapsibleCard;
