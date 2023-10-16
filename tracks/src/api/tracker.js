import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const instance = axios.create({
    baseURL:
        'https://80fe-2a02-c7c-2edd-6200-3594-2aaa-8715-c44c.ngrok-free.app',
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
