import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const networkSlice = createSlice({
    name: 'network',
    initialState: {
        connected: null,
        networkType: null,
    },
    reducers: {
        networkChanged(
            state,
            action: PayloadAction<{ connected: boolean; networkType: String }>
        ) {
            (state.connected = action.payload.connected),
                (state.networkType = action.payload.networkType);
        },
    },
});

export const { networkChanged } = networkSlice.actions;
export const networkReducer = networkSlice.reducer;
