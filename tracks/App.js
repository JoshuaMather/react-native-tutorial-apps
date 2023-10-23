import React from 'react';
import 'react-native-gesture-handler';
import 'expo-dev-client';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

// if (__DEV__) {
// import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
// import Reactotron from 'reactotron-react-native';
// }

// Reactotron.configure().connect();

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ResolveAuthScreen />
                {/* <App
                                    ref={(navigator) => {
                                        setNavigator(navigator);
                                    }}
                                /> */}
            </Provider>
        </SafeAreaProvider>
    );
}
