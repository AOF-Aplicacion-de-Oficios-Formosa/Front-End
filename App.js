import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useReducer, useState } from "react"
import { UserContext } from './src/context/UserContext.jsx';
import { userReducer } from './src/context/userReducer.js'
import { AppRegistry } from 'react-native';
import Home from './src/views/Home.jsx'
import Login from './src/views/Login.jsx';
import Register from './src/views/Register.jsx';
import Register2 from './src/views/Register2.jsx';
import Unlock from './src/views/Unlock.jsx';
import Search from './src/views/Search.jsx';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

AppRegistry.registerComponent('unlock', () => <Search />);


export default function App() {
  async function loadFonts() {
    await Font.loadAsync({
      'Product-Sans': require('./assets/fonts/Product-Sans-Bold.ttf')
    });
  }
  loadFonts();
  const Stack = createNativeStackNavigator();

  const obtenerToken = async () => JSON.parse(await AsyncStorage.getItem('userData')) || { isLogged: false };

  const [state, stateDispatch] = useReducer(userReducer, {}, obtenerToken);

  return (
    <>
      <UserContext.Provider value={{ state, stateDispatch }}>
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
        <StatusBar style="light" />
      </UserContext.Provider>
    </>
  );
}
