import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const BoxScreen = () => {
    return (
        <View>
            <View style={styles.viewStyle}>
                <Text style={styles.textOneStyle}>Child 1</Text>
                <Text style={styles.textTwoStyle}>Child 2</Text>
                <Text style={styles.textThreeStyle}>Child 3</Text>
            </View>
            <View style={styles.viewStyle2}>
                <View style={[styles.box, styles.red]}/>
                <View style={[styles.box, styles.green]}/>
                <View style={[styles.box, styles.blue]}/>
            </View>
        </View>
    );
};


// alignitems - horizontal/vertical alignment, depends on flexdirection
// flexdirection - children vertical or horizontal
// justifycontent - spacing
// flex - how much space child takes up (using numbers)
// alignself - overrides alignitems on parent
const styles = StyleSheet.create({
    viewStyle: {
        borderWidth: 3,
        borderColor: 'black',
        // flexDirection: 'row',
        height: 200,
        alignItems: 'stretch'
        // justifyContent: 'space-between'
    },
    viewStyle2: {
        borderWidth: 3,
        borderColor: 'black',
        flexDirection: 'row',
        height: 200,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    textOneStyle: {
        borderWidth: 1,
        borderColor: 'red',
        // flex: 4
        // marginVertical: 20,
        // marginHorizontal: 30
    },
    textTwoStyle: {
        borderWidth: 1,
        borderColor: 'red',
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        ...StyleSheet.absoluteFillObject, // same as above
        fontSize: 18,
        // top: 10
        // alignSelf: 'stretch'
        // flex: 4
        // marginVertical: 20,
        // marginHorizontal: 30
    },
    textThreeStyle: {
        borderWidth: 1,
        borderColor: 'red',
        // flex: 2
        // marginVertical: 20,
        // marginHorizontal: 30
    },
    box: {
        height: 80,
        width: 80
    },
    red: {
        backgroundColor: 'red'
    },
    green: {
        backgroundColor: 'green',
        top: 40
    },
    blue: {
        backgroundColor: 'blue'
    },
});

export default BoxScreen;
