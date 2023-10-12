import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { ...state, token: action.payload, errorMessage: '' };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { ...state, token: null, errorMessage: '' };
        default:
            return state;
    }
};

const tryLocalSignin = (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' });
};

const signup =
    (dispatch) =>
    async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signup', {
                email: email,
                password: password,
            });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token });
        } catch (err) {
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with signup',
            });
        }
    };

const signin =
    (dispatch) =>
    async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signin', {
                email,
                password,
            });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token });
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in',
            });
        }
    };

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);
