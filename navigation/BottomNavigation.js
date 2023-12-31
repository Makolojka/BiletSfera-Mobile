import React from 'react';
import {Text, View} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from "../components/screens/LoginScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TransactionsScreen from "../components/screens/TransactionsScreen";

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={LoginScreen} options={{
                tabBarLabel: 'Logowanie',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}
            />
            <Tab.Screen name="Transactions" component={TransactionsScreen} options={{
                tabBarLabel: 'Transakcje',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="ticket" color={color} size={size} />
                ),
            }}
            />
        </Tab.Navigator>
    );
};
export default BottomNavigation;