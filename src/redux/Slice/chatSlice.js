// chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import url from '../../components/url';

// Acción asincrónica utilizando createAsyncThunk
export const sendMessageAsync = createAsyncThunk(
  'chat/sendMessage',
  async (messageData) => {
    try {
      // Realizar la solicitud HTTP al servidor utilizando fetch
      const response = await fetch(url + '/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error(`Error al enviar el mensaje: ${response.statusText}`);
      }

      // Parsear la respuesta JSON
      const responseData = await response.json();

      // Retornar los datos para que puedan ser accedidos en el reducer
      return responseData;
    } catch (error) {
      // Lanzar el error para ser manejado por el reducer
      throw new Error(`Error al enviar el mensaje: ${error.message}`);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {
    // Esta acción síncrona no necesita cambios
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  // Agregar gestión para la acción asíncrona utilizando createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(sendMessageAsync.fulfilled, (state, action) => {
      // Acciones a realizar cuando la solicitud asíncrona es exitosa
      // Puedes actualizar el estado según la respuesta si es necesario
      // state.someState = action.payload;
      // También puedes realizar acciones adicionales aquí
    });
  },
});

export const { receiveMessage } = chatSlice.actions;

export default chatSlice.reducer;
