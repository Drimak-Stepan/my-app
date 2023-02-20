import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.takePhoto}>
        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            borderRadius: 50,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            transform: [{ translateX: 140 }, { translateY: 90 }],
          }}
          // onPress={() => navigation.navigate("LoginScreen")}
        >
          <FontAwesome name="camera" size={20} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ marginBottom: 32 }}>
        <Text style={styles.text}>Загрузити фото</Text>
      </TouchableOpacity>
      <View
        style={{
          marginBottom: 16,
        }}
      >
        <TextInput placeholder="Назва..." style={styles.input} />
      </View>
      <View
        style={{
          position: "relative",
          marginBottom: 32,
        }}
      >
        <TextInput
          placeholder="Місцевість..."
          style={{ ...styles.input, paddingLeft: 28 }}
        />
        <View
          style={{
            color: "#1B4371",
            position: "absolute",
            left: 0,
            top: 12,
          }}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        // onPress={() => {
        // }}
      >
        <Text style={styles.btnTitle}>Опублікувати</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    // alignItems: "center",
    // justifyContent: "center",
  },
  takePhoto: {
    backgroundColor: "#F6F6F6",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  input: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    height: 50,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#ffffff",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    borderRadius: 100,
    marginBottom: 16,
    ...Platform.select({
      ios: { backgroundColor: "#F6F6F6" },
      android: { backgroundColor: "#F6F6F6" },
    }),
  },

  btnTitle: { fontFamily: "Roboto-Regular", color: "#BDBDBD", fontSize: 16 },
});

export default CreatePostsScreen;
