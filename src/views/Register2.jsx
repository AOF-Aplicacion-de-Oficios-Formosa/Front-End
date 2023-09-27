import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType, focusCamera} from 'expo-camera'
import { Permissions, ImagePicker } from 'expo';
import * as MediaLibrary from 'expo-media-library'
import { TouchableWithoutFeedback, View, Button, Text, Image } from "react-native";
import { ScaledSheet, } from "react-native-size-matters";
import CameraButtons from "./Login-Register/CameraButtons";

const Register2 = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef= useRef(null)
  const [ requestPermission ] = MediaLibrary.usePermissions();

  useEffect(() =>{
    (async()=> {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted')
    })()
  }, [])

  const takePicture = async()=> {
    if (cameraRef){
      try{
        const data = await cameraRef.current.takePictureAsync();
        console.log(data)
        setImage(data.uri)
      } catch(e) {
        console.log(e)
      }
    }
  }
  
  const saveImage = async()=>{
    if(image) {
      try{
        await MediaLibrary.createAssetAsync(image);
        alert('Foto guardada!✌️')
      }catch(e) {
        console.log(e)
      }
    }
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error("Error al seleccionar una imagen:", error);
    }
  };

  if(hasCameraPermission === false){
    return <Text>No has proporcionado los permisos a la camara. </Text>
  }

  return(
    <View style={styles.container}>
      {!image ?
      <Camera
      style={styles.camera}
      type={type}
      flashMode={flash}
      ref={cameraRef}
      >
      <View style={styles.button2}>
        <CameraButtons icon={'flash'}
          color={flash === Camera.Constants.FlashMode.off ? 'black' : '#f1f1f1'}
          onPress={()=>{
          setFlash(flash === Camera.Constants.FlashMode.off 
            ? Camera.Constants.FlashMode.on
            : Camera.Constants.FlashMode.off)
        }}/>
      </View>
      </Camera>
      :
      <Image source={{uri: image}} style={styles.camera}/>
      }
      <View>
        
        {image ?
        <View style={styles.buttons}>
          <CameraButtons title={"Tomar otra"} icon = "cycle" onPress={()=> setImage(null)}/>
          <CameraButtons title={"Guardar"} icon = "check" onPress={saveImage}/>
        </View>
        :
        <View>
          <CameraButtons title={'Tomar una foto'} icon='camera' onPress={takePicture}/>
          <CameraButtons title={'Seleccionar foto desde galeria'} icon='squared-plus' onPress={pickImage}/>
        </View>
        
        }

      </View>
      
    </View>
  )
}
const styles = ScaledSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'rgba(2,96,182,1)',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    margin: '10@ms',
    marginTop: '200@ms',
    marginBottom: '120@ms',
    borderRadius: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  button2: {
    flexDirection: 'row',
    paddingHorizontal: '10@s',
    marginTop: '10@ms'
  }
})
export default Register2;
