import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);
    const insets = useSafeAreaInsets();

    return (
        // <SafeAreaView forceInset={{ top: 'always' }}>
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Text style={{ fontSize: 48 }}>AccountScreen</Text>
            <Spacer>
                <Button title="Sign Out" onPress={signout} />
            </Spacer>
        </View>
        // </SafeAreaView>
    );
};

// AccountScreen.navigationOptions = {
//     title: 'Account',
//     tabBarIcon: <FontAwesome name="gear" size={20} />,
// };

const styles = StyleSheet.create({});

export default AccountScreen;
