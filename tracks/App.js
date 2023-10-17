import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import 'expo-dev-client';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <TrackProvider>
                    <LocationProvider>
                        <AuthProvider>
                            <ResolveAuthScreen />
                            {/* <App
                                    ref={(navigator) => {
                                        setNavigator(navigator);
                                    }}
                                /> */}
                        </AuthProvider>
                    </LocationProvider>
                </TrackProvider>
            </Provider>
        </SafeAreaProvider>
    );
}
