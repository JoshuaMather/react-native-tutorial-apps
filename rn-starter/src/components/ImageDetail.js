import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ImageDetail = ({ title, imageSource, score }) => {
    return (
        <View>
            <Image source={imageSource} />
            <Text>Image of {title}</Text>
            <Text>Image Score - {score}</Text>
        </View>
    )
}

const styles = StyleSheet.create({});

export default ImageDetail;