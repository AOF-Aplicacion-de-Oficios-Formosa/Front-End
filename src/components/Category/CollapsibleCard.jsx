import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CollapsibleCard = ({ title, description }) => {
    const navigation = useNavigation()


    return (
        <View style={[styles.card]}>
            <TouchableOpacity onPress={()=> {navigation.navigate('worker')}}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Entypo name="chevron-small-right" size={24} color="black" />
                </View>
            </TouchableOpacity>
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
    description: {
        padding: 15,
    },
    descriptionText: {
        fontSize: 20,
        fontFamily: 'Product-Sans',
        margin: 10,
    },
});

export default CollapsibleCard;
