import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TransactionsScreen from "../components/screens/TransactionsScreen";
import CartScreen from "../components/screens/CartScreen";
import {COLORS} from "../components/screens/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import HomeScreen from "../components/screens/HomeScreen";
import LogoutScreen from "../components/screens/LogoutScreen";
import {ImageBackground} from "react-native";
import ProfileScreen from "../components/screens/ProfileScreen";
import TicketDetailsScreen from "../components/screens/TicketDetailsScreen";
import EventDetailsScreen from "../components/screens/EventDetailsScreen";

const Tab = createBottomTabNavigator();

const BottomNavigation = (props) => {
    // const navigation = useNavigation();
    // const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        return props.navigation.addListener('focus', async () => {
            props.navigation.navigate('Home');
        });
    }, [props.navigation]);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarBackground: () => (
                    <ImageBackground
                        source={require('../components/screens/img/bg_2.jpg')}
                        style={{
                            flex: 1,
                            resizeMode: 'cover', // or 'contain', based on your requirement
                        }}
                    />
                ),
                tabBarLabelStyle: {
                    color: 'white', // Customize label color
                },
            }}
        >
            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
                options={({ route }) => ({
                    tabBarButton: (props) =>
                        route.state && route.state.index > 0 ? null : (
                            <Tab.Screen {...props} />
                        ),
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={COLORS.third} size={size} />
                    ),
                    tabBarLabelStyle: {
                        color: COLORS.third,
                    },
                    headerShown: false,
                })}
            />

            <Tab.Screen
                name="Transakcje"
                component={TransactionsScreen}
                options={({ route }) => ({
                    tabBarLabel: 'Transakcje',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="ticket" color={COLORS.main} size={size} />
                    ),
                    tabBarLabelStyle: {
                        color: COLORS.main,
                    },
                    headerShown: false,
                })}
            />

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={COLORS.main} size={size} />
                    ),
                    tabBarLabelStyle: {
                        color: COLORS.main,
                    },
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Koszyk"
                component={CartScreen}
                options={{
                    tabBarLabel: 'Koszyk',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="basket" color={COLORS.main} size={size} />
                    ),
                    tabBarLabelStyle: {
                        color: COLORS.main,
                    },
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="TicketDetails"
                component={TicketDetailsScreen}
                options={({ route }) => ({
                    tabBarButton: (props) =>
                        route.state && route.state.index > 0 ? null : (
                            <Tab.Screen {...props} />
                        ),
                    tabBarLabel: 'Szczegóły biletu',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={COLORS.third} size={size} />
                    ),
                    tabBarLabelStyle: {
                        color: COLORS.third,
                    },
                    headerShown: false,
                })}
            />
            <Tab.Screen
                name="EventDetails"
                component={EventDetailsScreen}
                options={({ route }) => ({
                    tabBarButton: (props) =>
                        route.state && route.state.index > 0 ? null : (
                            <Tab.Screen {...props} />
                        ),
                    tabBarLabel: 'Szczegóły wydarzenia',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={COLORS.third} size={size} />
                    ),
                    tabBarLabelStyle: {
                        color: COLORS.third,
                    },
                    headerShown: false,
                })}
            />
        </Tab.Navigator>
    );
};
export default BottomNavigation;