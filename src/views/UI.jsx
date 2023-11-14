import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useState } from 'react'
import CategoryList from '../components/Category/CategoryList'
import { Octicons } from '@expo/vector-icons';
import Register2 from './Register2';
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

        </Tab.Navigator>
    )
}

export default UI