import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import BottomNavigation from "./navigation/BottomNavigation";
import LoginScreen from "./components/screens/LoginScreen";
import FlashMessage from "react-native-flash-message";

const App = () => {
    return (
        // <NavigationContainer>
        //     <BottomNavigation/>
        // </NavigationContainer>
        <LoginScreen>
        </LoginScreen>

    );
};
export default App;