import React from "react";
import { View, Text, StyleSheet } from "react-native";
const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PostsScreen Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default PostsScreen;
