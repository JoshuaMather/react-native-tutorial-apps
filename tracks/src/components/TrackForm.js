import React, { useContext } from 'react';
import { Button, Input } from 'react-native-elements';
import Spacer from './Spacer';
import { useDispatch, useSelector } from 'react-redux';
import useSaveTrack from '../hooks/useSaveTrack';
import {
    changeName,
    reset,
    startRecording,
    stopRecording,
} from '../store/slices/locationSlice';

const TrackForm = () => {
    const { name, recording, locations } = useSelector(
        (state) => state.location
    );

    const dispatch = useDispatch();
    const [saveTrack] = useSaveTrack();

    return (
        <>
            <Spacer>
                <Input
                    value={name}
                    placeholder="Enter Name"
                    onChangeText={(newName) => dispatch(changeName(newName))}
                />
            </Spacer>
            <Spacer>
                {recording ? (
                    <Button
                        title="Stop"
                        onPress={() => dispatch(stopRecording())}
                    />
                ) : (
                    <Button
                        title="Start Recording"
                        onPress={() => dispatch(startRecording())}
                    />
                )}
            </Spacer>
            <Spacer>
                {!recording && locations.length ? (
                    <Button title="Save Recording" onPress={saveTrack} />
                ) : null}
            </Spacer>
            <Spacer>
                {!recording && locations.length ? (
                    <Button
                        title="Clear Track"
                        onPress={() => dispatch(reset())}
                    />
                ) : null}
            </Spacer>
        </>
    );
};

export default TrackForm;
