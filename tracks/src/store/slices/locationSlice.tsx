import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    recording: false,
    locations: [],
    currentLocation: null,
};

interface Location {
    timestamp: number;
    coords: {
        speed: number;
        heading: number;
        accuracy: number;
        altitudeAccuracy: number;
        altitude: number;
        latitude: number;
        longitude: number;
    };
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        changeName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        startRecording(state) {
            state.recording = true;
        },
        stopRecording(state) {
            state.recording = false;
        },
        addLocation(state, action: PayloadAction<Location>) {
            state.currentLocation = action.payload;
            if (state.recording) {
                state.locations = [...state.locations, action.payload];
            }
        },
        reset(state) {
            state.name = '';
            state.locations = [];
        },
    },
});

export const { changeName, startRecording, stopRecording, addLocation, reset } =
    locationSlice.actions;
export const locationReducer = locationSlice.reducer;
