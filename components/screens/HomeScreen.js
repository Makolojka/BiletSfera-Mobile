import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "./Colors";
import AuthService from "../../services/AuthService";
// <a href="https://www.freepik.com/free-vector/purple-fluid-background_14731345.htm#query=purple%20mobile%20wallpapers&position=6&from_view=keyword&track=ais&uuid=cc38bbd1-e4a0-49d7-ae65-99faba41fbee">Image by rawpixel.com</a> on Freepik
// <a href="https://www.freepik.com/free-vector/purple-neon-lined-pattern-dark-social-story-background-vector_31068117.htm#query=purple%20mobile%20wallpapers&position=2&from_view=keyword&track=ais&uuid=cc38bbd1-e4a0-49d7-ae65-99faba41fbee">Image by rawpixel.com</a> on Freepik
const Tile = ({ title, iconName, onPress }) => {
    return (
        <TouchableOpacity style={styles.tile} onPress={onPress}>
            <MaterialIcons style={styles.icon} name={iconName} size={40} color="#333" />
            <Text style={styles.tileText}>{title}</Text>
        </TouchableOpacity>
    );
};
const HomeScreen = (props) => {
    const logout = async () => {
        try {
            const isLoggedOut = await AuthService.logout();
            if (isLoggedOut) {
                props.navigation.navigate('Login')
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Panel użytkownika</Text>
            <View style={styles.tilesContainer}>
                <View style={styles.column}>
                    <Tile iconName={'account'} title="Profil" onPress={() => props.navigation.navigate('Profil')} />
                    <Tile iconName={'ticket'} title="Transakcje" onPress={() => props.navigation.navigate('Transakcje')} />
                    <Tile iconName={'logout'} title="Wyloguj się" onPress={() => logout()} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        // width: '100%',
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        // flexGrow: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: COLORS.third,
        borderBottomColor: COLORS.third,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    tilesContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 5,
    },
    tile: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        marginHorizontal: 15,
        marginVertical: 10,
        backgroundColor: COLORS.main,
        // elevation: 5,
        borderWidth: 1,
        borderColor: COLORS.mainGrey,
        elevation: 10,
    },
    tileText: {
        margin: 5,
        fontSize: 18,
        textAlign: "center",
        color: COLORS.mainGreyDark,
    },
    icon: {
        fontSize: 60,
        color: COLORS.mainGreyDark,
    },
});
export default HomeScreen;