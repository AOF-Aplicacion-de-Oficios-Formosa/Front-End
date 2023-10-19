import React, { useEffect, useReducer } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './src/context/UserContext.jsx';
import Home from './src/views/Home.jsx'
import Login from './src/views/Login.jsx';
import Register from './src/views/Register.jsx';
import Register2 from './src/views/Register2.jsx';
import Unlock from './src/views/Unlock.jsx';
import Search from './src/views/Search.jsx';
import * as Font from 'expo-font';


export default function App() {
  // Función para cargar fuentes de manera asincrónica
  const loadFonts = async () => {
    await Font.loadAsync({
      'Product-Sans': require('./assets/fonts/Product-Sans-Bold.ttf')
    });
  };

  useEffect(() => {
    // Cargar fuentes al iniciar la aplicación
    loadFonts();
  }, []);

  const Stack = createNativeStackNavigator();


  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="unlock">
          <Stack.Screen name="home" options={{ headerShown: false, gestureEnabled: false }} component={Home} />
          <Stack.Screen name="login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="register" options={{ headerShown: false }} component={Register} />
          <Stack.Screen name="unlock" options={{ headerShown: false }} component={Unlock} />
          <Stack.Screen name="register2" options={{ headerShown: false }} component={Register2} />
          <Stack.Screen name="search" options={{ headerShown: false }} component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
