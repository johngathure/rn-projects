import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

const ListScreen = () => {
  const friends = [
    { name: "friend #1", age: 20 },
    { name: "friend #2", age: 30 },
    { name: "friend #3", age: 25 },
    { name: "friend #4", age: 16 },
    { name: "friend #5", age: 2 },
    { name: "friend #6", age: 12 },
    { name: "friend #7", age: 16 },
    { name: "friend #8", age: 36 },
    { name: "friend #9", age: 52 },
    { name: "friend #10", age: 15 },
    { name: "friend #11", age: 5 },
    { name: "friend #12", age: 31 },
  ];
  return (
    <FlatList
      keyExtractor={(friend) => friend.name}
      data={friends}
      renderItem={({ item }) => {
        return (
          <Text style={styles.listItemStyle}>
            {item.name} - Age: {item.age}
          </Text>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listItemStyle: {
    marginVertical: 5,
  },
});
export default ListScreen;
