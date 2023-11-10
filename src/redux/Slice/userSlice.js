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

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token || ''; // Devuelve '' si el token es null
    } catch (error) {
        console.error("Error token:", error);
        throw error; // Lanza el error nuevamente
    }
};

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

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al iniciar sesión. Detalles: ${errorMessage}`);
        }

        const user = await response.json();
        if (!user || !user.token) {
            throw new Error('Token no encontrado en la respuesta del servidor.');
        }

        await guardarToken(user.token);
        return user;
    } catch (error) {
        console.log("Error al hacer el fetch", error);
        throw error;
    }
});

export const GetUser = createAsyncThunk('GetUser', async () => {
    try {
        console.log('get users')
        const getUser = url + '/userT';
        const token = await getToken();
        const response = await fetch(getUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener usuario único. Status: ${response.status}`);
        }

        const users = await response.json(); // Parsea la respuesta JSON
        console.log("user redux ", users);
        return users.user;
    } catch (error) {
        console.log("Error al hacer el fetch", error);
        throw error;
    }
});

export const LogOutUser = createAsyncThunk('LogOutUser', async () => {
    try {
        // Puedes realizar cualquier lógica adicional aquí antes de realizar el logout

        // Elimina el token almacenado en AsyncStorage
        await AsyncStorage.removeItem("token");

        return { ok: true, msg: 'Sesión cerrada exitosamente' };
    } catch (error) {
        console.error("Error al cerrar sesión", error);
        throw error;
    }
});

const initialState = {
    status: null,
    loading: 'idle',
    dataUser: {}
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
                state.status = actions.payload
        })
        builder.addCase(LoginUser.rejected, (state) => {
            state.loading = 'failed'
        })
        builder.addCase(GetUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(GetUser.fulfilled, (state, actions) => {
            state.loading = false,
                state.dataUser = actions.payload
        })
        builder.addCase(GetUser.rejected, (state) => {
            state.loading = 'failed'
        })
        builder.addCase(LogOutUser.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(LogOutUser.fulfilled, (state, actions) => {
            state.loading = false;
            state.status = actions.payload;
          });
          builder.addCase(LogOutUser.rejected, (state) => {
            state.loading = 'failed';
          });
    }
})

export default userSlice.reducer;