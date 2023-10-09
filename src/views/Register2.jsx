import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { View, Text, Image } from 'react-native';
import OpenSettings from 'react-native-open-settings';
import CameraButtons from '../components/Register/CameraButtons';
import SelectDropdown from 'react-native-select-dropdown'
import { ScaledSheet } from 'react-native-size-matters';

const categories = "http://192.168.217.219:4000/category"

const Register2 = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

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
        const options = { quality: 0.5, base64: true };
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
      setSelectedImage(result.uri);
    }
    else {
      alert('No se seleccionó ninguna foto.😒')
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

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={categories}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {

          return selectedItem
        }}
        rowTextForSelection={(item, index) => {

          return item
        }}
        style={selectDropdownStyles.container}
        dropdownStyle={selectDropdownStyles.dropdownContainer}
      />

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
            <CameraButtons icon="check" title="Guardar" onPress={saveImage} />
          </View>
        ) : (
          <View style={styles.buttons}>
            <CameraButtons title={'Tomar una foto'} icon='camera' onPress={takePicture} />
            <CameraButtons title="Seleccionar foto desde galería" icon='squared-plus' onPress={openImagePicker} />
          </View>
        )}
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
    marginTop: '180@ms',
    marginBottom: '100@ms',
    borderRadius: 20,
  },
  buttons: {
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  button2: {
    flexDirection: 'row',
    paddingHorizontal: '10@s',
    marginTop: '10@ms'
  },
  buttons3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
})

const selectDropdownStyles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(2,96,182,1)',
    justifyContent: 'center',
    marginLeft: 100
  },
  dropdownContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 100,
    marginRight: 100
  },
});
export default Register2;
