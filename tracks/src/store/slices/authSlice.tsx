import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { authApi } from '../apis/authApi';

export const tryLocalSignIn = createAsyncThunk('getToken', async () => {
    const token = await SecureStore.getItemAsync('token');
    return token;
});

export const signout = createAsyncThunk('signout', async () => {
    await SecureStore.deleteItemAsync('token');
    return;
});

const storeToken = async (token) => {
    await SecureStore.setItemAsync('token', token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        errorMessage: '',
    },
    reducers: {
        clearErrorMessage(state) {
            state.errorMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(tryLocalSignIn.fulfilled, (state, action) => {
            state.token = action.payload;
            state.errorMessage = '';
        });
        builder.addCase(signout.fulfilled, (state, action) => {
            state.token = null;
            state.errorMessage = '';
        });
        builder.addMatcher(
            authApi.endpoints.signup.matchFulfilled,
            (state, { payload }) => {
                console.log(payload);
                storeToken(payload.token);
                state.token = payload.token;
            }
        );
        builder.addMatcher(
            authApi.endpoints.signin.matchFulfilled,
            (state, { payload }) => {
                console.log(payload);
                storeToken(payload.token);
                state.token = payload.token;
            }
        );
        builder.addMatcher(
            authApi.endpoints.signup.matchRejected,
            (state, { payload }) => {
                console.log(payload);
                state.errorMessage = 'Something went wrong with signup';
            }
        );
        builder.addMatcher(
            authApi.endpoints.signin.matchRejected,
            (state, { payload }) => {
                console.log('payload');
                console.log(payload);
                state.errorMessage = 'Something went wrong with signin';
            }
        );
    },
});

export const { clearErrorMessage } = authSlice.actions;
export const authReducer = authSlice.reducer;
