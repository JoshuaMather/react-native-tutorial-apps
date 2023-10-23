import React, { useContext, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from '../store/apis/authApi';
import { clearErrorMessage } from '../store/slices/authSlice';

const SignupScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { errorMessage } = useSelector((state) => state.auth);
    const [signup] = useSignupMutation();

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
            <AuthForm
                headerText="Sign up for Tracker"
                submitButtonText="Sign Up"
                errorMessage={errorMessage}
                // onSubmit={({ email, password }) => signup(email, password)}
                onSubmit={signup}
            />
            <NavLink
                routeName="Signin"
                text="Already have an account? Sign in!"
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

export default SignupScreen;
