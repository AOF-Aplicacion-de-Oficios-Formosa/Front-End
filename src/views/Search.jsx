import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import CollapsibleCard from '../components/CollapsibleCard';

const Search = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.137.1:4000/category');
                setCategories(response.data); // Asumiendo que la respuesta es un arreglo de categorías
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
                placeholder="Buscar categorías..."
                onChangeText={setSearchText}
                value={searchText}
                containerStyle={styles.searchBarContainer} // Estilo del contenedor del SearchBar
                inputContainerStyle={styles.searchBarInputContainer} // Estilo del contenedor del input
                inputStyle={styles.searchBarInput} // Estilo del input
            />
            

            {filteredCategories.length === 0 ? (
                <Text>No se encontraron categorías</Text>
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

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,96,182,1)',
        fontFamily: 'Product-Sans'
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: '10@ms',
        fontFamily: 'Product-Sans'
    },
    searchBarInputContainer: {
        backgroundColor: 'white',
        borderRadius: '10@ms', 
        height: '40@ms',
        fontFamily: 'Product-Sans'
    },
    searchBarInput: {
        color: 'black',
        fontFamily: 'Product-Sans'
    },
});

export default Search;
