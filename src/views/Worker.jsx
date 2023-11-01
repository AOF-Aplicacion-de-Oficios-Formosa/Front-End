import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import url from '../components/url';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';


const Worker = ({ route }) => {
  const { categoryId } = route.params; // categoryId es la ID de la categoría
  const [workers, setWorkers] = useState([]);
  const [category, setCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [description, setDescription] = useState(null);
  const navigation = useNavigation();

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
            <View style={styles.workerItem}>
              <Text style={styles.text2}>Nombre: {item.user ? item.user.name : 'Sin nombre'}</Text>
              <Text style={styles.text2}>Experiencia: {item.experience}</Text>
              <View style={styles.content}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('workerprofile', {
                      userId: item._id,
                      workers: workers,
                      description: item.description, // Agregar la descripción
                    });
                  }}
                >
                  <Text style={styles.buttonText}>
                    Ver Más
                  </Text>
                </TouchableOpacity>
              </View>
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
    color: 'black',
    borderColor: '#000000',
    marginBottom: '5@ms'
  },
  workerItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco por defecto
    padding: '10@ms',
    margin: '5@ms',
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 20,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
  },
  content: {
    padding: '5@ms',
    borderRadius: '10@ms',
    alignItems: 'center',
  },
});

export default Worker;
