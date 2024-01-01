import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { decode } from "base-64";
global.atob = decode;

class AuthService {
    url = 'http://10.0.2.2:3001/api';
    constructor() {
    }

    async authenticate(credentials) {
        try {
            const response = await axios.post(this.url + '/user/auth', {
                login: credentials.login,
                password: credentials.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const result = response.data;
                if (result && result.token) {
                    await AsyncStorage.setItem('token', result.token);
                    return true;
                }
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
        return false;
    }

    getTokenAndDecode = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                // const decodedToken = jwtDecode(token);
                const decoded = jwtDecode(token);
                console.log(decoded);
                const userId = decoded.userId;
                console.log('User ID:', userId);
                return userId;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    async logout() {
        try {
            // TODO: userId dynamically
            let userId = "658c6381e381c64f248fa9c0";

            const response = await axios.delete(this.url + '/user/logout/'+userId,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
                },
            });
            if (response.status === 200) {
                const result = response.data;
                if (result && result.token) {
                    await AsyncStorage.removeItem('token');
                    return true;
                }
            }

            return true;
        } catch (error) {
            console.error('Logout error:', error);
        }
        return false;
    }

    async isLoggedIn() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null && token !== ''){
                console.log("token: ", token)
                return true;
            }
            return false; // Returns true if token exists
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
        return false;
    }

    // Other helper methods...
}

export default new AuthService();
