import { useDispatch } from 'react-redux';
import useSaveTrack from './useSaveTrack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCreateTrackMutation } from '../store/apis/trackApi';

export default () => {
    const [createTrack, { error }] = useCreateTrackMutation();
    const dispatch = useDispatch();

    const submitCache = async () => {
        // set track state then submit
        console.log('Submit cache');
        const trackCache = await AsyncStorage.getItem('track-cache');
        let tracks = trackCache != null ? JSON.parse(trackCache) : null;
        if (tracks) {
            console.log('TRACKS', tracks);
            tracks.forEach(async (track) => {
                console.log('save track', track);

                try {
                    const res = await createTrack(track);
                    console.log('res', res);
                    if (error || 'error' in res) {
                        console.log('error-text', error);
                        return;
                    }
                    (tracks = tracks.filter((item) => {
                        return item.name !== track.name;
                    })),
                        await AsyncStorage.setItem(
                            'track-cache',
                            JSON.stringify(tracks)
                        );
                    console.log('SAVED', tracks);
                } catch (err) {
                    console.log('err-text', err);
                    return;
                }
            });
        }
    };

    return { submitCache };
};
