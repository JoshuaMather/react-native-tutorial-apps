import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { networkReducer } from './slices/networkSlice';
import { locationReducer } from './slices/locationSlice';

export const store = configureStore({
    reducer: {
        network: networkReducer,
        location: locationReducer,
    },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
