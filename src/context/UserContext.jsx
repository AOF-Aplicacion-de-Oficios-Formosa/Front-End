import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [myState, setState] = useState(null);

    // Define la función setUser
    const setUser = (userData) => {
        setState(userData);
    };

    useEffect(() => {
        const token = AsyncStorage.getItem('token');
        if (!token) return;
    }, []);

    return (
        <UserContext.Provider value={{ myState, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
};
