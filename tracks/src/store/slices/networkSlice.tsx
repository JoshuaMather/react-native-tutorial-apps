import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import useCacheSubmit from '../../hooks/useCacheSubmit';

// const { submitCache } = useCacheSubmit();

const networkSlice = createSlice({
    name: 'network',
    initialState: {
        connected: null,
        networkType: null,
        uploading: false,
    },
    reducers: {
        networkChanged(
            state,
            action: PayloadAction<{ connected: boolean; networkType: String }>
        ) {
            (state.connected = action.payload.connected),
                (state.networkType = action.payload.networkType);
            // if (state.connected === true) {
            //     submitCache();
            // }
        },
    },
});

export const { networkChanged } = networkSlice.actions;
export const networkReducer = networkSlice.reducer;
