import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { signout } from '../store/slices/authSlice';
import useCacheSubmit from '../hooks/useCacheSubmit';
import useCacheAdd from '../hooks/useCacheAdd';

const AccountScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const { submitCache } = useCacheSubmit();
    const { addToCache } = useCacheAdd();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            track = {
                name: 'test',
                locations: [
                    {
                        coords: {
                            accuracy: 13.465999603271484,
                            altitude: 116.20000457763672,
                            altitudeAccuracy: 0.9271583557128906,
                            heading: 0,
                            latitude: 53.4241612,
                            longitude: -2.7460683,
                            speed: 0.08601167052984238,
                        },
                        mocked: false,
                        timestamp: 1699459293873,
                    },
                    {
                        coords: {
                            accuracy: 27.540000915527344,
                            altitude: 116.20000457763672,
                            altitudeAccuracy: 0.9319633841514587,
                            heading: 350.73236083984375,
                            latitude: 53.4241805,
                            longitude: -2.7462217,
                            speed: 1.7022489309310913,
                        },
                        mocked: false,
                        timestamp: 1699459297061,
                    },
                ],
            };
            // addToCache(track);
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
