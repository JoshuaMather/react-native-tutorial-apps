import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { reset } from '../store/slices/locationSlice';

export default () => {
    const { createTrack } = useContext(TrackContext);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const locationState = useSelector((state) => state.locations);

    const saveTrack = async () => {
        await createTrack(locationState.name, locationState.locations);
        dispatch(reset());
        navigation.navigate('TrackList');
    };

    return [saveTrack];
};
