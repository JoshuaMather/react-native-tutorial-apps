import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { reset } from '../store/slices/locationSlice';
import { useCreateTrackMutation } from '../store/apis/trackApi';

export default () => {
    const [createTrack, createTrackResults] = useCreateTrackMutation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const locationState = useSelector((state) => state.location);

    const saveTrack = async () => {
        await createTrack({
            name: locationState.name,
            locations: locationState.locations,
        });
        dispatch(reset());
        navigation.navigate('TrackList');
    };

    return [saveTrack];
};
