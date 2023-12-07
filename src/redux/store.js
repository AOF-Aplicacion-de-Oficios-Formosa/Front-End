import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/Slice/userSlice'
import chatReducer from '../redux/Slice/chatSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer
    },
});

export default store;