import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
// import { BASE_URL } from '@env';
// import { BASE_URL } from 'react-native-dotenv';

import * as SecureStore from 'expo-secure-store';

export const api = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
        prepareHeaders: async (headers, query) => {
            const token = await SecureStore.getItemAsync('token');
            if (token) {
                headers.set('authorization', 'Bearer ' + token);
            }
            return headers;
        },
    }),
    tagTypes: ['Tracks'],
    refetchOnFocus: true,
    endpoints: () => ({}),
});
