import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import LoginTabs from "./navigation/LoginTabs";

const App = () => {
    return (
        <NavigationContainer>
            <LoginTabs />
        </NavigationContainer>
    );
};
export default App;