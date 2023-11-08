import { useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { networkChanged } from '../store/slices/networkSlice';
import useCacheSubmit from './useCacheSubmit';

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribeNet = NetInfo.addEventListener((state) => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            dispatch(
                networkChanged({
                    connected: state.isConnected,
                    networkType: state.type,
                })
            );
        });

        return unsubscribeNet;
    }, []);
};
