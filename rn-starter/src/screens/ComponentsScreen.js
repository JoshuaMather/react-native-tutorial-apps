import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ComponentsScreen = () => {
    const name = 'Josh';
    const nameText = <Text style={styles.nameTextStyle}>Hi my name is {name}</Text>;

    return (
        <View>
            <Text style={styles.textStyle}>Getting started with react native!</Text>
            {nameText}
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45
    },
    nameTextStyle: {
        fontSize: 20
    },
});

export default ComponentsScreen;