import React, { useCallback, useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import useNetwork from '../hooks/useNetwork';
import { RootState } from '../store/store';
import useCacheSubmit from '../hooks/useCacheSubmit';

const NetworkBanner = () => {
    useNetwork();
    const { submitCache } = useCacheSubmit();
    const networkState = useSelector((state: RootState) => state.network);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (networkState.connected) {
            console.log('CONNECTED');
            submitCache();
        }
    }, [networkState.connected]);

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <View style={styles.banner}>
                <Text style={styles.text}>
                    Type: {networkState.networkType}
                </Text>
                <Text style={styles.text}>
                    Connected: {String(networkState.connected)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#949494',
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default NetworkBanner;
