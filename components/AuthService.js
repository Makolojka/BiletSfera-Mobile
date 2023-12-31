import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
    url = 'http://localhost:3001/api';
    constructor() {
    }

    async authenticate(credentials) {
        try {
            const response = await fetch(this.url+'/user/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: credentials.login,
                    password: credentials.password,
                }),
            });

            if (response.ok) {
                const result = await response.json();
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

    // Other authentication methods...

    async logout() {
        try {
            await AsyncStorage.removeItem('token');
            // Perform any additional cleanup or server-side logout
            // For example, if needed: await this.http.delete(this.url + '/user/logout');
            return true;
        } catch (error) {
            console.error('Logout error:', error);
        }
        return false;
    }

    async isLoggedIn() {
        try {
            const token = await AsyncStorage.getItem('token');
            return !!token; // Returns true if token exists
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
        return false;
    }

    // Other helper methods...
}

export default new AuthService();
