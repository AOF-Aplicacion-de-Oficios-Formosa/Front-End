import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import url from "../../components/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const guardarToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token)
        console.log('token', token)

    } catch (error) {
        console.log('Ocurrio un error', error)
    }
}


export const LoginUser = createAsyncThunk('LoginUser', async (data) => {
    try {
        const login = url + '/login';
        const response = await fetch(login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const user = response.data
        console.log(user.token)
        await guardarToken(user.token)
        return user;

    } catch (error) {
        console.log("Error al hacer el fetch", error)
        throw error;
    }
})


const initialState = {
    usuario: [],
    loading: 'idle'
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, actions) => {
            state.loading = false,
                state.usuario = actions.payload
        })
        builder.addCase(LoginUser.rejected, (state) => {
            state.loading = 'failed'
        })
    }
})

export default userSlice.reducer;