import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ComponentsScreen = () => {
  const name = "John Gathure";
  return (
    <View>
      <Text style={styles.title}>Getting started with React Native!</Text>
      <Text style={styles.normal}> My name is {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
  },
  normal: {
    fontSize: 20,
  },
});

export default ComponentsScreen;
