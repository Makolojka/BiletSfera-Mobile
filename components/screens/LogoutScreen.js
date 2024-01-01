import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AuthService from "../../services/AuthService";

const LogoutScreen = (props) => {
    useEffect(() => {
        let a = AuthService.logout()
        if(a){
            props.navigation.navigate('Login');
        }
    }, [props.navigation]);
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