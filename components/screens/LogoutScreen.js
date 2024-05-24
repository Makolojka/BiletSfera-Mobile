import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AuthService from "../../services/AuthService";

const LogoutScreen = (props) => {
    useEffect(() => {
        const handleLogout = async () => {
            try {
                const isLoggedOut = await AuthService.logout();
                if (isLoggedOut) {
                    props.navigation.navigate('Login');
                }
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        handleLogout();
    }, []);
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text>Home</Text>
        </View>
    );
};
export default LogoutScreen;