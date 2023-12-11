import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import url from '../../components/url';

// Acción asincrónica utilizando createAsyncThunk
import axios from 'axios'; // Importa Axios

export const sendMessageAsync = createAsyncThunk(
  'chat/sendMessage',
  async (messageData) => {
    try {
      // Utiliza Axios para realizar la solicitud POST
      const response = await axios.post(url + '/send', messageData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Accede directamente al mensaje enviado desde la respuesta de Axios
      return response.data.message;
    } catch (error) {
      // Lanza el error para ser manejado por el reducer
      throw new Error(`Error al enviar el mensaje: ${response.statusText} (${response.status}) - ${errorData.message}`);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle', // 'idle', 'pending', 'fulfilled', 'rejected'
    error: null,
  },
  reducers: {
    receiveMessage: (state, action) => {
      const { message, fromUserId, toUserId } = action.payload;
      if (typeof message === 'string') {
        state.messages.push({ message, fromUserId, toUserId});
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.messages.push(action.payload);
      })
      .addCase(sendMessageAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { receiveMessage } = chatSlice.actions;

export default chatSlice.reducer;