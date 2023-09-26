import React, { useReducer } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const reducer = (state, action) => {
    switch(action.type){
        case 'update_counter':
            return {...state, counter: state.counter+action.payload}
    }
}

const CounterScreen = () => {
    const [state, dispatch] = useReducer(reducer, {
        counter: 0
    });
    
    return (
        <View>
            <Button title="increse" onPress={() => {
                dispatch({
                    type: 'update_counter',
                    payload: 1
                })
            }} />
            <Button title="decrease" onPress={() => {
                dispatch({
                    type: 'update_counter',
                    payload: -1
                })
            }} />
            <Text>Counter Count: {state.counter}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CounterScreen;
