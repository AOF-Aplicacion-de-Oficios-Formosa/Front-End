import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters'; // Importa ScaledSheet

const Worker = ({ route }) => {
  const { categoryId } = route.params; // categoryId es la ID de la categoría

  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    async function fetchWorkersByCategory() {
      try {
        const response = await fetch(`/workers/category/${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          setWorkers(data); // Supongo que los trabajadores se devuelven como una lista en la respuesta.
        } else {
          console.error('Hubo un error en la solicitud:', response.statusText);
        }
      } catch (error) {
        console.error(`Hubo un error: ${error}`);
      }
    }

    fetchWorkersByCategory();
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trabajadores en esta categoría:</Text>
      <FlatList
        data={workers}
        keyExtractor={worker => worker.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.text}>{item.name}</Text>
        )}
      />
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
});

export default Worker;
