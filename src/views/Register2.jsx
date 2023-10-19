import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { View, Text, Image, StyleSheet, } from 'react-native';
import OpenSettings from 'react-native-open-settings';
import CameraButtons from '../components/Register/CameraButtons';
import SelectDropdown from 'react-native-select-dropdown'
import { ScaledSheet } from 'react-native-size-matters';
import url from './../components/url';
import { Entypo } from '@expo/vector-icons';

const Register2 = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = {
          quality: 0.9,
          base64: true,
          aspect: [4, 3],
          allowsEditing: true
        };
        const data = await cameraRef.current.takePictureAsync(options);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert('Foto guardada! ✌️');
      } catch (e) {
        console.log(e);
      }
    }
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0]; // Obtén la primera imagen del array "assets"
        setSelectedImage(selectedAsset.uri);
      } else {
        alert('No se seleccionó ninguna foto.😒');
      }
    }
  };

  // Verificar si hay una imagen seleccionada para mostrar automáticamente
  useEffect(() => {
    if (selectedImage) {
      setImage(selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();

      if (cameraStatus.status === 'granted') {
        setHasCameraPermission(true);
      } else {
        try {
          const newCameraStatus = await Camera.requestCameraPermissionsAsync();
          if (newCameraStatus.status === 'granted') {
            setHasCameraPermission(true);
          } else {
            alert('Permiso de cámara requerido', 'Por favor, permite el acceso a la cámara en la configuración de tu dispositivo.', [
              {
                text: 'OK',
                onPress: () => {
                  OpenSettings.openSettings();
                },
              },
            ]);
          }
        } catch (error) {
          console.log('Error al solicitar permiso de cámara:', error);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + '/category');
        const data = await response.json();

        // Filtrar categorías con nombres definidos antes de ordenar
        const categoriesWithNames = data.filter(category => category.name);
        const sortedCategories = categoriesWithNames.sort((a, b) => a.name.localeCompare(b.name));

        // Extraer los nombres de las categorías ordenadas y establecerlos en el estado
        const categoryNames = sortedCategories.map((category) => category.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error al obtener datos de categorías:', error);
      }
    };

    // Llamar a la función fetchData para obtener y ordenar las categorías
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>
          ¿Qué ofreces?
        </Text>
        <Text style={styles.text2}>
          1. Selecciona la categoría a la cual pertenece tu certificado y deseas ofrecer.
        </Text>
        <Text style={styles.text2}>
          2. Sube una foto de tu certificado.
        </Text>
        <Text style={styles.text2}>
          3. Presiona "Enviar" y espera a que habilitemos tu cuenta.
        </Text>

      </View>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View style={styles.button2}>
            <CameraButtons icon={'flash'}
              color={flash === Camera.Constants.FlashMode.off ? 'black' : '#f1f1f1'}
              onPress={() => {
                setFlash(flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off)
              }} />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View style={styles.buttons3}>
            <CameraButtons
              icon="cycle"
              title="Tomar otra"
              onPress={() => {
                setImage(null);
                setSelectedImage(null);
              }}
            />
            <CameraButtons icon="check" title="Enviar" fontFamily='Product-Sans' onPress={saveImage} />
          </View>
        ) : (
          <View style={styles.buttons}>
            <View style={styles1.centeredContainer}>
              <SelectDropdown
                data={categories}
                onSelect={(selectedItem, index) => {
                  setSelectedCategory(selectedItem);
                  console.log(`Categoría seleccionada: ${selectedItem}`);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                style={styles.selectDropdown}
                dropdownStyle={styles.dropdownContainer}
                buttonStyle={styles.selectDropdown}
                defaultButtonText="Seleccionar Categoría"
                buttonTextStyle={{ fontFamily: 'Product-Sans' }}
                renderDropdownIcon={() => (
                  <Entypo name={'chevron-small-down'} size={24} color="black" />
                )}
              />
            </View>
            <CameraButtons title={'Tomar una foto'} icon='camera' onPress={takePicture} />
            <CameraButtons title="Seleccionar foto desde galería" icon='squared-plus' onPress={openImagePicker} />
          </View>
        )
        }
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgba(2,96,182,1)',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    margin: '10@ms',
    marginTop: '10@ms',
    marginBottom: '40@ms',
    borderRadius: 20,
  },
  buttons: {
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  button2: {
    flexDirection: 'row',
    paddingHorizontal: '10@s',
    marginTop: '10@ms',
  },
  buttons3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  selectDropdown: {
    borderRadius: 15,
    width: '100%',
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  dropdownContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  text: {
    marginLeft: '20@ms',
    fontFamily: 'Product-Sans',
    fontSize: 45,
    color: '#FFFF',
    borderColor: '#000000',
    marginTop: '5@ms'
  },
  text2: {
    marginLeft: '20@ms',
    fontFamily: 'Product-Sans',
    fontSize: 20,
    color: '#FFFF',
    borderColor: '#000000',
    marginTop: '5@ms',
    marginBottom: '5@ms'
  },
  inputWrapper: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: '35@ms',
    marginLeft: '10@ms',
    marginRight: '10@ms',
  },
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(2,96,182,1)',
    justifyContent: 'center',

  },
  centeredContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -30,
  },
  // Resto de tus definiciones de estilo
});
export default Register2;
