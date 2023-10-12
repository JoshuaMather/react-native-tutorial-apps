import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'react-native-elements';

const TrackDetailScreen = ({ navigation, route }) => {
    const { state } = useContext(TrackContext);
    const _id = route.params._id;
    const insets = useSafeAreaInsets();

    const track = state.find((t) => t._id === _id);
    const initialCoords = track.locations[0].coords;

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
                {track.name}
            </Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                    ...initialCoords,
                }}
            >
                <Polyline
                    coordinates={track.locations.map((loc) => loc.coords)}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300,
    },
    header: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});

export default TrackDetailScreen;
