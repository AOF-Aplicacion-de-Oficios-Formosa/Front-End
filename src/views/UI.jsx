import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useState } from 'react'
import CategoryList from '../components/Category/CategoryList'
import { Octicons, Feather } from '@expo/vector-icons';

import Register2 from './Register2';
import Profile from './Profile';
const Tab = createBottomTabNavigator()

function UI() {
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Categorías"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Octicons name="apps" size={25} color={color} />
                    ),
                    headerShown: false,
                }}
            >
                {() => <CategoryList filteredCategories={filteredCategories} setSearchText={setSearchText} searchText={searchText} />}
            </Tab.Screen>
            <Tab.Screen
                name='Perfil'
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={25} color={color} />
                    ),
                    headerShown: false,
                }}
            >
                {() => <Profile />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default UI;