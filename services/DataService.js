import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { decode } from "base-64";
import AuthService from "./AuthService";
global.atob = decode;

class DataService {
    url = 'http://10.0.2.2:3001/api';
    async getAllTransactions() {
        try {
            let userId = await AuthService.getUserId();
            const response = await axios.get(this.url+'/transactions/all/'+userId,{
                headers: {
                    'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }

    async getTicketDetailsById(ticketId) {
        try {
            const response = await axios.get(this.url+ '/events/tickets/'+ticketId);
            return response.data;
        } catch (error) {
            console.error('Error fetching ticket details:', error);
            throw error;
        }
    }
}

export default new DataService();
