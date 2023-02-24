import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ route, navigation }) => {
  const { photo } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image
          source={{ uri: photo }}
          style={{ height: 240, borderRadius: 8 }}
        />
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.comment}>
        <TextInput placeholder="Коментувати..." style={styles.input} />
        <View
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            height: 34,
            width: 34,
            backgroundColor: "#FF6C00",
          }}
        >
          <Feather name="arrow-up" size={20} color="#ffffff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#ffffff",
    // alignItems: "space-between",
    justifyContent: "space-between",
  },
  comment: {
    position: "relative",
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    marginBottom: 16,
    paddingLeft: 16,
    ...Platform.select({
      ios: { backgroundColor: "#F6F6F6" },
      android: { backgroundColor: "#F6F6F6" },
    }),
  },

  input: { fontFamily: "Roboto-Medium", color: "#212121", fontSize: 16 },
});

export default CommentsScreen;
