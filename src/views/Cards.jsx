import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';

const Cards = () => {
    const width = Dimensions.get('window').width;
    const navigation = useNavigation();

    const cardData = [
        {
            title: 'CONTRATAR UN OFICIO',
            imageSource: require('../../assets/img/oficios2.jpg'),
            text: 'Aquí podrás encontrar distintos tipos de oficios, según su categoría.',
            buttonTitle: 'CONTRATAR',
            navigate: 'search',
            iconName: 'search', // Icono para Contratar
        },
        {
            title: 'OFRECER UN OFICIO',
            imageSource: require('../../assets/img/oficios_mujeres.jpg'),
            text: 'Ofrece los servicios en los cuales eres especialista.',
            buttonTitle: 'OFRECER',
            navigate: 'register',
            iconName: 'bullhorn', // Icono para Ofrecer
        },
    ];

    return (
        <View>
            <Carousel
                loop
                width={width}
                height={width}
                autoPlay={true}
                data={cardData}
                panGestureHandlerProps={{
                    activoOffsetX: [-10, 10],
                }}
                scrollAnimationDuration={1800}
                renderItem={({ item }) => (
                    <View>
                        <Card containerStyle={styles.card}>
                            <Card.Title style={styles.text}>{item.title}</Card.Title>
                            <Card.Divider />
                            <Image style={styles.image} source={item.imageSource} />
                            <Text style={styles.text}>{item.text}</Text>
                            <Button
                                onPress={() => navigation.navigate(item.navigate)}
                                icon={
                                    <Icon name={item.iconName} type="font-awesome" color="#ffffff" iconStyle={styles.icon} />
                                }
                                buttonStyle={{ borderRadius: 15, backgroundColor: 'rgba(2,76,139,255)' }}
                                title={item.buttonTitle}
                            />
                        </Card>
                    </View>
                )}
            />
        </View>
    );
};
const styles = ScaledSheet.create({
    card: {
        marginRight: '10@ms',
        borderRadius: 20,
        alignContent: 'center',
        color: '#FFFFF',

    },
    icon: {
        marginRight: '5@ms',
    },
    image: {
        width: '320@ms',
        height: '150@vs',
        resizeMode: 'contain',
        marginTop: '-10@ms',
        marginVertical: '-0@vs',
        borderRadius: 20,
    },
    text: {
        marginLeft: '10@ms',
        fontFamily: 'Product-Sans',
        fontSize: 20,
        color: 'black',
        borderColor: '#000000',
        marginBottom: '5@ms'
    },
});


export default Cards;
