import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import url from '../components/url';
import { Button } from '@rneui/base';

const Worker = ({ route }) => {
  const { categoryId } = route.params; // categoryId es la ID de la categoría
  const [workers, setWorkers] = useState([]);
  const [category, setCategory] = useState(null); // Define la variable category y su función setState
  const [errorMessage, setErrorMessage] = useState(null); // Define la variable errorMessage y su función setState
  const [description, setDescription] = useState(null);

  useEffect(() => {
    async function fetchWorkersByCategory() {
      try {
        const response = await fetch(url + `/workers/category/${categoryId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }

        const data = await response.json();
        setWorkers(data.workers);
        setCategory(data.category);
        setDescription(data.description);
      } catch (error) {
        console.error('Hubo un error:', error);
        setErrorMessage('Hubo un error al cargar los trabajadores.');
      }
    }

    fetchWorkersByCategory();
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Categoría nombre: {category ? category.name : 'Nombre no disponible'}</Text>
      <Text style={styles.text}>Trabajadores en esta categoría:</Text>
      <View>
        <FlatList
          data={workers}
          keyExtractor={(worker) => worker._id.toString()}
          renderItem={({ item, index }) => (
            <View style={[styles.workerItem, index % 2 === 0 ? styles.evenItem : styles.oddItem]}>
              <Text style={styles.text2}>Nombre del trabajador: {item.user ? item.user.name : 'Sin nombre'}</Text>
              <Text style={styles.text2}>Experiencia: {item.experience}</Text>
              <Text style={styles.text2}>Descripción: {item.description}</Text>
              <Button title={'Contratar'} onPress={''}></Button>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(2,76,139,255)',
    padding: '16@s',
  },
  title: {
    marginLeft: '20@ms',
    fontFamily: 'Product-Sans',
    fontSize: 30,
    color: '#FFFF',
    borderColor: '#000000',
    marginTop: '15@ms'
  },
  text: {
    marginLeft: '20@ms',
    fontFamily: 'Product-Sans',
    fontSize: 25,
    color: '#FFFF',
    borderColor: '#000000',
    marginTop: '15@ms'
  },
  text2: {
    marginLeft: '20@ms',
    fontFamily: 'Product-Sans',
    fontSize: 25,
    color: '#FFFF',
    borderColor: '#000000',
  },
  workerItem: {
    backgroundColor: 'black', // Fondo blanco por defecto
    padding: '10@ms',
    margin: '5@ms',
    borderRadius: 10,
  },
  evenItem: {
    backgroundColor: 'lightblue', // Fondo azul claro para los elementos pares
  },
  oddItem: {
    backgroundColor: 'lightgreen', // Fondo verde claro para los elementos impares
  },
});

export default Worker;
