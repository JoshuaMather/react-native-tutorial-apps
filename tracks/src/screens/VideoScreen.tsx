import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import Spacer from '../components/Spacer';

const VideoScreen = () => {
    const video = useRef(null);
    const [playing, setPlaying] = useState(false);
    const video2 = useRef(null);
    const [playing2, setPlaying2] = useState(false);

    return (
        <View>
            <Text className="text-center text-4xl pt-5 font-bold">Video</Text>
            {/* <ScrollView> */}
            <View className="items-center">
                <Text className="text-center text-2xl pt-5">Video #1</Text>
                <Video
                    ref={video}
                    source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls={true}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={(status) => {
                        console.log(status);
                        if (status.isLoaded) {
                            setPlaying(status.isPlaying);
                        }
                    }}
                    className="h-40 w-4/5"
                />
                {/* <VideoPlayer
                        videoProps={{
                            shouldPlay: true,
                            resizeMode: ResizeMode.CONTAIN,
                            source: {
                                uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                            },
                            // style: { height: 20 },
                        }}
                    /> */}
                <Spacer>
                    <Button
                        title={playing ? 'Pause' : 'Play'}
                        onPress={() =>
                            playing
                                ? video.current.pauseAsync()
                                : video.current.playAsync()
                        }
                    />
                </Spacer>
            </View>

            <View className="items-center">
                <Text className="text-center text-2xl pt-5">Video #2</Text>
                <Video
                    ref={video2}
                    source={{
                        uri: 'https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4',
                    }}
                    useNativeControls={true}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={(status) => {
                        console.log(status);
                        if (status.isLoaded) {
                            setPlaying2(status.isPlaying);
                        }
                    }}
                    className="h-40 w-4/5"
                />
                <Spacer>
                    <Button
                        title={playing2 ? 'Pause' : 'Play'}
                        onPress={() =>
                            playing2
                                ? video2.current.pauseAsync()
                                : video2.current.playAsync()
                        }
                    />
                </Spacer>
            </View>
            {/* </ScrollView> */}
        </View>
    );
};

export default VideoScreen;
