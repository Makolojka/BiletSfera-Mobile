import React, {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import LoginTabs from "./navigation/LoginTabs";
import AuthService from "./services/AuthService";

const App = () => {
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const isExpired = AuthService.isTokenExpired();
    //         console.log(isExpired);
    //     }
    //     fetchData()
    //         .catch(console.error);
    // }, [])
    return (
        <NavigationContainer>
            <LoginTabs />
        </NavigationContainer>
    );
};
export default App;