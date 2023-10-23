import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

instance.interceptors.request.use(
    async (config) => {
        // const token = await AsyncStorage.getItem('token');
        const token = await SecureStore.getItemAsync('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;
