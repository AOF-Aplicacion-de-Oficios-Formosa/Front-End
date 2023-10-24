import React, {useState, useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import CollapsibleCard from './CollapsibleCard';
import { ScaledSheet } from 'react-native-size-matters';
import url from '../url';

const CategoryList = () => {
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url + '/category');
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
                console.log(`Hubo un error: ${error}`  );
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

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(2,76,139,255)',
        fontFamily: 'Product-Sans',
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: '10@ms',
        fontFamily: 'Product-Sans',
        marginTop: 30,
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
    text: {
        marginLeft: '20@ms',
        fontFamily: 'Product-Sans',
        fontSize: 25,
        color: '#FFFF',
        borderColor: '#000000',
        marginTop: '15@ms'
    },
});

export default CategoryList;
