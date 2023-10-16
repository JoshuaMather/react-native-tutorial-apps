import React, { useContext } from 'react';
import { StyleSheet, View, Text, VirtualizedList } from 'react-native';
import { Context as NetworkContext } from '../context/NetworkContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NetworkBanner = () => {
    const { state } = useContext(NetworkContext);
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
            <View style={styles.banner}>
                <Text style={styles.text}>Type: {state.networkType}</Text>
                <Text style={styles.text}>
                    Connected: {String(state.connected)}
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
