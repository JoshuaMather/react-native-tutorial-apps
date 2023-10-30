import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    View,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
} from 'react-native';
import { Text } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import NetInfo from '@react-native-community/netinfo';
import { useFetchTracksQuery } from '../store/apis/trackApi';

const TrackListScreen = ({ navigation }) => {
    const { data, isFetching, error, refetch } = useFetchTracksQuery();
    const insets = useSafeAreaInsets();
    // const [type, setType] = useState(NetInfo.type);
    // const [isConnected, setIsConnected] = useState(NetInfo.isConnected);

    const onRefresh = React.useCallback(() => {
        refetch();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refetch();
        });
        // const unsubscribeNet = NetInfo.addEventListener((state) => {
        //     console.log('Connection type', state.type);
        //     console.log('Is connected?', state.isConnected);
        // });
        // setTimeout(() => {
        //     setIsConnected(false);
        // }, 10000);
        // return () => {
        //     unsubscribe;
        //     unsubscribeNet;
        // };
        return unsubscribe;
    }, [navigation]);

    let content;
    if (isFetching) {
        content = <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
    } else if (error) {
        console.log(error);
        content = <Text>Error fetching track</Text>;
    } else {
        content = (
            <View className="flex-1">
                <Text h2 style={styles.header}>
                    Track List
                </Text>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={onRefresh}
                        />
                    }
                    data={data}
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
                                        <ListItem.Title>
                                            {item.name}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
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
            className="flex-1"
        >
            {content}
        </View>
    );
};

const style = 'body { opacity: 0.99; }';

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});

export default TrackListScreen;
