import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TransactionsScreen from "../components/screens/TransactionsScreen";
import {COLORS} from "../components/screens/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import HomeScreen from "../components/screens/HomeScreen";
import LogoutScreen from "../components/screens/LogoutScreen";

const Tab = createBottomTabNavigator();

const BottomNavigation = (props) => {
    // const navigation = useNavigation();
    // const [isLogged, setIsLogged] = useState(false);
    // React.useEffect(() => {
    //     return props.navigation.addListener('focus', async () => {
    //         const token = await AsyncStorage.getItem('token');
    //         console.log("token: ", token)
    //         if(token !== null && token !== ''){
    //             props.navigation.navigate('Home');
    //         }
    //     });
    // }, [props.navigation]);

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
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
            <Tab.Screen name="Logout" component={LogoutScreen} options={{
                tabBarLabel: 'Wyloguj',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="logout" color={COLORS.third} size={size} />
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