import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const CollapsibleCard = ({ title, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const icon = isExpanded ? 'chevron-small-up' : 'chevron-small-down';

    const onPress = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={[styles.card]}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Entypo name={icon} size={24} color="black" />
                </View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={[styles.description]}>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>
            )}
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
