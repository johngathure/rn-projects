import React, { useReducer } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, counter: state.counter + action.payload };
    case "SUBTRACT":
      return { ...state, counter: state.counter - action.payload };
    default:
      return state;
  }
};

const CounterScreen = () => {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });
  const counter = state.counter;

  return (
    <View>
      <Button
        title="Increase"
        onPress={() => dispatch({ type: "ADD", payload: 1 })}
      />
      <Button
        title="Decrease"
        onPress={() => dispatch({ type: "SUBTRACT", payload: 1 })}
      />
      <Text>Current Count: {counter} </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CounterScreen;
