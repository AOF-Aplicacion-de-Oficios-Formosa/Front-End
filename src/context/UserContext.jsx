import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [myState, setState] = useState(null);

    useEffect(() => {
        const token = AsyncStorage.getItem('token');
        if (!token) return;
    }, []);

    return (
        <UserContext.Provider value={{ myState, setState }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
};
