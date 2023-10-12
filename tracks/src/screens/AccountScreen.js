import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);
    const insets = useSafeAreaInsets();

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
                <Button title="Sign Out" onPress={signout} />
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
