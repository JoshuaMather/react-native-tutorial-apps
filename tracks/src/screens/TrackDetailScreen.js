import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'react-native-elements';
import { useFetchTracksQuery } from '../store/apis/trackApi';

const TrackDetailScreen = ({ navigation, route }) => {
    const { data, isFetching, error } = useFetchTracksQuery();
    const _id = route.params._id;
    const insets = useSafeAreaInsets();

    const track = data.find((t) => t._id === _id);
    const initialCoords = track.locations[0].coords;

    let content;
    if (isFetching) {
        content = <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
    } else if (error) {
        console.log(error);
        content = <Text>Error fetching track</Text>;
    } else {
        content = (
            <>
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
            </>
        );
    }

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            {content}
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
