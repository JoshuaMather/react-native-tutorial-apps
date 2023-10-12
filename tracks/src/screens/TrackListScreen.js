import React, { useContext, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchTracks();
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
                Track List
            </Text>
            <FlatList
                data={state}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('TrackDetail', {
                                    _id: item._id,
                                })
                            }
                        >
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});

export default TrackListScreen;
