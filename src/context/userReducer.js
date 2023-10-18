import AsyncStorage from '@react-native-async-storage/async-storage'
import { userType } from './userTypes'

export const userReducer = async (state, action)=>{

    switch (action.type) {
        case userType.login:
            await AsyncStorage.setItem('userData', JSON.stringify({isLogged: true, token: action.token, nombre: action.nombre}))
            return {
                isLogged: true,
                token: action.token,
                nombre: action.nombre
            }
        case userType.logOut:
            AsyncStorage.removeItem('userData')
            return {
                isLogged: false
            }

        default:
            break;
    }
}