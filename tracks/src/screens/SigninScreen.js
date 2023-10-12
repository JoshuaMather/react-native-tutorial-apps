import React, { useContext, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(Context);

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
                headerText="Sign in to your account"
                submitButtonText="Sign In"
                errorMessage={state.errorMessage}
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
