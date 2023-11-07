import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
    const addToCache = async (track) => {
        console.log('Add to cache');
        try {
            const trackCache = await AsyncStorage.getItem('track-cache');
            let tracks = trackCache != null ? JSON.parse(trackCache) : [];

            tracks.push(track);
            console.log(tracks);

            const jsonTracks = JSON.stringify(tracks);
            await AsyncStorage.setItem('track-cache', jsonTracks);
        } catch (err) {
            // error reading value
            console.log('cache error', err);
        }
    };

    return { addToCache };
};
