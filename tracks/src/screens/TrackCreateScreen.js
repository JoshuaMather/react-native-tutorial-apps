// import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import { withNavigationFocus } from 'react-navigation';
import TrackForm from '../components/TrackForm';
import { FontAwsome } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {
    const insets = useSafeAreaInsets();
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
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Text h2>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </View>
    );
};

// TrackCreateScreen.navigationOptions = {
//     title: 'Add Track',
//     tabBarIcon: <FontAwsome name="plus" size={20} />,
// };

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
