import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCreateTrackMutation } from '../store/apis/trackApi';

export default () => {
    const [createTrack, { error }] = useCreateTrackMutation();

    const submitCache = async () => {
        // set track state then submit
        console.log('Submit cache');
        const trackCache = await AsyncStorage.getItem('track-cache');
        let tracks = trackCache != null ? JSON.parse(trackCache) : null;
        if (tracks.length > 0) {
            await AsyncStorage.setItem('track-cache', JSON.stringify([]));
            tracks.forEach(async (track) => {
                console.log('save track', track.name);

                try {
                    const res = await createTrack(track);
                    console.log('res');
                    if (error || 'error' in res) {
                        console.log('error-text', error);
                        await AsyncStorage.setItem(
                            'track-cache',
                            JSON.stringify(tracks)
                        );
                        return;
                    }
                    (tracks = tracks.filter((item) => {
                        return item.name !== track.name;
                    })),
                        await AsyncStorage.setItem(
                            'track-cache',
                            JSON.stringify(tracks)
                        );
                    console.log('SAVED');
                } catch (err) {
                    console.log('err-text', err);
                    await AsyncStorage.setItem(
                        'track-cache',
                        JSON.stringify(tracks)
                    );
                    return;
                }
            });
        }
    };

    return { submitCache };
};
