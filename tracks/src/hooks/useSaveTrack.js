import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { reset } from '../store/slices/locationSlice';
import { useCreateTrackMutation } from '../store/apis/trackApi';
import useCacheAdd from './useCacheAdd';
import { Alert } from 'react-native';

export default () => {
    const [createTrack, { error }] = useCreateTrackMutation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const locationState = useSelector((state) => state.location);
    const { addToCache } = useCacheAdd();

    const errorAlert = () => {
        Alert.alert(
            'Error Saving Track',
            'There was an error saving the track. It has been cached and will be resaved automatically.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
    };

    const saveTrack = async () => {
        const track = {
            name: locationState.name,
            locations: locationState.locations,
        };

        try {
            const res = await createTrack(track);
            console.log('res', res);
            dispatch(reset());
            if (error || res.error) {
                console.log('error-text', error);
                addToCache(track).then(() => errorAlert());
                return;
            }
            navigation.navigate('TrackList');
        } catch (err) {
            console.log('err-text', err);
            addToCache(track).then(() => errorAlert());
        }
    };

    return [saveTrack];
};
