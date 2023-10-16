import { useState, useEffect, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Context as NetworkContext } from '../context/NetworkContext';

export default () => {
    const { networkChanged } = useContext(NetworkContext);

    useEffect(() => {
        const unsubscribeNet = NetInfo.addEventListener((state) => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            networkChanged(state.isConnected, state.type)
        });

        return unsubscribeNet
    }, [])
}