import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from "../../services/AuthService";
import {COLORS} from "./Colors";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Import AsyncStorage

const ProfileScreen = () => {
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const userDetailsFromToken = await AuthService.getUserDetails();
                if(userDetailsFromToken)
                {
                    setUserDetails(userDetailsFromToken);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }

        fetchUserDetails();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            <View style={styles.tile}>
                <View style={styles.row}>
                    <MaterialIcons style={styles.icon} name="card-account-details-outline" size={40} color="#333" />
                    <Text style={styles.text}>Nazwa</Text>
                </View>
                <Text style={styles.text}>{userDetails.name}</Text>
            </View>
            <View style={styles.tile}>
                <View style={styles.row}>
                    <MaterialIcons style={styles.icon} name="email" size={40} color="#333" />
                    <Text style={styles.text}>Email</Text>
                </View>
                <Text style={styles.text}>{userDetails.email}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'transparent'
    },
    tile: {
        flexDirection: 'column',
        padding: 10,
        margin: 10,
        borderBottomWidth: 1,
        borderColor: COLORS.mainGrey,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    icon: {
        fontSize: 30,
        color: COLORS.third,
    },
    title: {
        fontSize: 20,
        // borderBottomWidth: 1,
        // paddingBottom: 20,
        marginBottom: 10,
        color: COLORS.third,
        // borderBottomColor: COLORS.third,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    profileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
        width: 100,
    },
    value: {
        flex: 1,
    },
    text: {
        marginLeft: 10,
        textAlign: "left",
        color: COLORS.third,
        fontSize: 22,
    }
});

export default ProfileScreen;
