import React, {useEffect, useState} from 'react';
import LoginScreen from "../components/screens/LoginScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../components/screens/Colors";
import BottomNavigation from "./BottomNavigation";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthService from "../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";

const Tab = createNativeStackNavigator();

const LoginTabs = (props) => {
    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');
            const expirationTime = jwtDecode(token).exp * 1000;
            const currentTime = Date.now();
            if(expirationTime > currentTime){
                console.log("Token valid");
            }
            else{
                await AsyncStorage.removeItem('token');
                props.navigation.navigate('Login');
                console.log("Token expired");
            }
        }
        fetchData()
            .catch(console.error);
    }, [])
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