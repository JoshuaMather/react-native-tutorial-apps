import React from 'react';
import 'react-native-gesture-handler';
import 'expo-dev-client';
import { Provider as AuthProvider } from './src/context/AuthContext';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <TrackProvider>
                    <AuthProvider>
                        <ResolveAuthScreen />
                        {/* <App
                                    ref={(navigator) => {
                                        setNavigator(navigator);
                                    }}
                                /> */}
                    </AuthProvider>
                </TrackProvider>
            </Provider>
        </SafeAreaProvider>
    );
}
