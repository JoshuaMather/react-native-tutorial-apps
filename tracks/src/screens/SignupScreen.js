import React, { useContext, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            clearErrorMessage();
        });

        const unsubscribeBlur = navigation.addListener('blur', () => {
            clearErrorMessage();
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
                errorMessage={state.errorMessage}
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
