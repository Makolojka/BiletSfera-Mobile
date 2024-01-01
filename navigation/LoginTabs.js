import React, {useEffect, useState} from 'react';
import LoginScreen from "../components/screens/LoginScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../components/screens/Colors";
import BottomNavigation from "./BottomNavigation";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

const LoginTabs = (props) => {
    return (
        <Tab.Navigator >
            <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    tabBarLabel: 'Login',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="login" color={COLORS.third} size={size} />
                    ),
                    tabBarLabelStyle: {
                        color: COLORS.second,
                    },
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="UserNav"
                component={BottomNavigation}
                options={{
                    tabBarLabel: 'Nav',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="login" color={COLORS.third} size={size} />
                    ),
                    tabBarLabelStyle: {
                        color: COLORS.second,
                    },
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};
export default LoginTabs;