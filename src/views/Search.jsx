import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import CollapsibleCard from '../components/CollapsibleCard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import url from '../components/url';

const Tab = createBottomTabNavigator();

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url+'/category');
                if (response.ok) {
                    const data = await response.json();
                    // Filtra las categorías sin 'name' definido
                    const filteredData = data.filter((category) => category.name);
                    // Ordena las categorías alfabéticamente
                    filteredData.sort((a, b) => a.name.localeCompare(b.name));
                    setCategories(filteredData);
                } else {
                    console.log('Hubo un error en la solicitud:', response.statusText);
                }
            } catch (error) {
                console.log('Hubo un error:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filteredCategories = categories.filter((category) =>
            (category.name && category.name.toLowerCase().includes(searchText.toLowerCase())) ||
            (category.description && category.description.toLowerCase().includes(searchText.toLowerCase()))
        );
        setFilteredCategories(filteredCategories);
    }, [categories, searchText]);

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Buscar categorías"
                onChangeText={setSearchText}
                value={searchText}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
                inputStyle={styles.searchBarInput}
            />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'rgba(2,96,182,1)',
                    tabBarInactiveTintColor: 'gray',
                    keyboardHidesTabBar: true,
                }}
            >
                <Tab.Screen
                    name="Categorías"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Octicons name="apps" size={25} color={color} />
                        ),
                        headerShown: false,
                    }}
                >
                    {() => <CategoryList filteredCategories={filteredCategories} />}
                </Tab.Screen>
                <Tab.Screen
                    name="Perfil"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="person-outline" size={25} color={color} />
                        ),
                    }}
                    component={OtraPestana}
                >

                </Tab.Screen>
            </Tab.Navigator>
        </View>
    );
};

const CategoryList = ({filteredCategories}) => {

    return (
        <View style={styles.container}>
            {filteredCategories && filteredCategories.length === 0 ? (
                <Text style={styles.text}>No se encontraron categorías</Text>
            ) : (
                <FlatList
                    data={filteredCategories}
                    keyExtractor={(item, index) => (item.id || index).toString()}
                    renderItem={({ item }) => (
                        <CollapsibleCard
                            title={item.name}
                            description={item.description}
                        />
                    )}
                />
            )}
        </View>
    );
};

const OtraPestana = () => {
    return (
        <View>
            {/* Contenido de la otra pestaña */}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,96,182,1)',
        fontFamily: 'Product-Sans',
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: '10@ms',
        fontFamily: 'Product-Sans',
        marginTop: 20,
    },
    searchBarInputContainer: {
        backgroundColor: 'white',
        borderRadius: '20@ms',
        height: '40@ms',
        width: '200@ms',
        fontFamily: 'Product-Sans',
    },
    searchBarInput: {
        color: 'black',
        fontFamily: 'Product-Sans',
    },
    iconWrapper: {
        backgroundColor: 'gray',
        borderRadius: 10,
        padding: 10
    },
    text: {
        marginLeft: '20@ms',
        fontFamily: 'Product-Sans',
        fontSize: 25,
        color: '#FFFF',
        borderColor: '#000000',
        marginTop: '15@ms'
    },
});

export default Search;

