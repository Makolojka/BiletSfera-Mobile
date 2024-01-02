import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import {decode} from "base-64";

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
            if (error.response && error.response.status === 401) {
                return 'Unauthorized';
            }
            console.error('Authentication error:', error);
        }
        return false;
    }

    async isTokenExpired() {
        const token = await AsyncStorage.getItem('token');
        const expirationTime = jwtDecode(token).exp * 1000;
        const currentTime = Date.now();
        return expirationTime < currentTime;
    }

    async getValidToken() {
        try {
            return await AsyncStorage.getItem('token');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }

    getUserId = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                // const decodedToken = jwtDecode(token);
                const decoded = jwtDecode(token);
                // console.log(decoded);
                // console.log('User ID:', userId);
                return decoded.userId;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    getUserDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                const email = decoded.email;
                const name = decoded.name;
                return { email, name };
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };


    async logout() {
        try {
            // TODO: userId dynamically
            let userId = await this.getUserId();

            const response = await axios.delete(this.url + '/user/logout/'+userId,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
                },
            });
            if (response.status === 200) {
                const result = response.data;
                if (result) {
                    // console.log("await AsyncStorage.removeItem('token')")
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
            return token !== null && token !== '';
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
        return false;
    }

    // Other helper methods...
}

export default new AuthService();
