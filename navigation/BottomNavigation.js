import React from 'react';
import {Text, View} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from "../components/screens/LoginScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TransactionsScreen from "../components/screens/TransactionsScreen";
import {COLORS} from "../components/screens/Colors";

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={LoginScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={COLORS.third} size={size} />
                    ),
                    tabBarLabelStyle: {
                        color: COLORS.second,
                    },
                    headerShown: false,
                }}
            />
            <Tab.Screen name="Transakcje" component={TransactionsScreen} options={{
                tabBarLabel: 'Transakcje',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="ticket" color={COLORS.third} size={size} />
                ),
                tabBarLabelStyle: {
                    color: COLORS.second,
                },
                headerShown: false
            }}
            />
        </Tab.Navigator>
    );
};
export default BottomNavigation;