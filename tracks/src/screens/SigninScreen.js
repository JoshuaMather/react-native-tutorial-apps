import React, { useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage } from '../store/slices/authSlice';
import { useSigninMutation } from '../store/apis/authApi';

const SigninScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { errorMessage } = useSelector((state) => state.auth);
    const [signin] = useSigninMutation();

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            dispatch(clearErrorMessage());
        });

        const unsubscribeBlur = navigation.addListener('blur', () => {
            dispatch(clearErrorMessage());
        });

        return () => {
            unsubscribeFocus;
            unsubscribeBlur;
        };
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <Text>{process.env.EXPO_PUBLIC_BASE_URL}</Text> */}
            <AuthForm
                headerText="Sign in to your account"
                submitButtonText="Sign In"
                errorMessage={errorMessage}
                onSubmit={signin}
            />
            <NavLink
                text="Don't have an account? Sign up!"
                routeName="Signup"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default SigninScreen;
