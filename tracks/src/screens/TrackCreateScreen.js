// import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { useIsFocused } from '@react-navigation/native';

const TrackCreateScreen = () => {
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const {
        state: { recording },
        addLocation,
    } = useContext(LocationContext);
    const callback = useCallback(
        (location) => {
            addLocation(location, recording);
        },
        [recording]
    );

    const [err] = useLocation(isFocused || recording, callback);
    return (
        <ScrollView>
            <View
                style={{
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                }}
            >
                <Text h2 style={styles.header}>
                    Create a Track
                </Text>
                <Map />
                {err ? <Text>Please enable location services</Text> : null}
                <TrackForm />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});

export default TrackCreateScreen;
