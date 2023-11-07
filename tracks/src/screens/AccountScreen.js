import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { signout } from '../store/slices/authSlice';
import useCacheSubmit from '../hooks/useCacheSubmit';

const AccountScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const { submitCache } = useCacheSubmit();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            submitCache();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Text h2 style={styles.header}>
                Account
            </Text>
            <Spacer>
                <Button
                    title="Test Form"
                    onPress={() => navigation.navigate('TestForm')}
                />
            </Spacer>
            <Spacer>
                <Button title="Sign Out" onPress={() => dispatch(signout())} />
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
    },
});

export default AccountScreen;
