import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { useSelector } from 'react-redux';

const Map = () => {
    // let points = [];
    // for (let i = 0; i < 20; i++) {
    //     if (i % 2 === 0) {
    //         points.push({
    //             latitude: 53.42711 + i * 0.001,
    //             longitude: -2.72828 + i * 0.001,
    //         });
    //     } else {
    //         points.push({
    //             latitude: 53.42711 - i * 0.002,
    //             longitude: -2.72828 + i * 0.001,
    //         });
    //     }
    // }
    const { currentLocation, locations } = useSelector(
        (state) => state.location
    );

    if (!currentLocation) {
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
    }

    // for fake location
    // initialLocation = {
    //     longitude: -122.0312186,
    //     latitude: 37.33233141,
    //   };
    //   return (
    //     <MapView
    //       style={styles.map}
    //       initialRegion={{
    //         ...initialLocation,
    //         latitudeDelta: 0.01,
    //         longitudeDelta: 0.01,
    //       }}
    //     >

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            // region={{
            //     ...currentLocation.coords,
            //     latitudeDelta: 0.01,
            //     longitudeDelta: 0.01,
            // }}
        >
            {/* <Polyline coordinates={points} /> */}
            <Circle
                center={currentLocation.coords}
                radius={30}
                strokeColor="rgba(158,158,255,1.0)"
                fillColor="rgba(158,158,255,0.3)"
            />
            <Polyline coordinates={locations.map((loc) => loc.coords)} />
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300,
    },
});

export default Map;
