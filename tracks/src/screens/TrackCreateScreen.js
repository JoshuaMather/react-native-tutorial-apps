// import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { useIsFocused } from '@react-navigation/native';
import { addLocation } from '../store/slices/locationSlice';

const TrackCreateScreen = () => {
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { recording } = useSelector((state) => state.location);
    const callback = useCallback(
        (location) => {
            dispatch(addLocation(location));
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
