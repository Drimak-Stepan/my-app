import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

const COURSES = [
  {
    id: "45k6-j54k-4jth",
    title: "HTML",
  },
  {
    id: "4116-jfk5-43rh",
    title: "JavaScript",
  },
  {
    id: "4d16-5tt5-4j55",
    title: "React",
  },
  {
    id: "LG16-ant5-0J25",
    title: "React Native",
  },
];

const ProfileScreen = ({ navigation }) => {
  const [courses, setCourses] = useState(COURSES);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgr}
        source={require("../../assets/images/photoBG.png")}
      >
        <SafeAreaView style={{ ...styles.home, width: dimensions }}>
          <View style={styles.header}>
            <Text style={styles.title}>Hello</Text>
          </View>

          <FlatList
            style={styles.flat}
            data={courses}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.title}</Text>
            )}
            keyExtractor={(item) => item.id}
          />
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: [{ translateX: 128 }, { translateY: -60 }],
              backgroundColor: "#F6F6F6",
              borderRadius: 16,
              width: 120,
              height: 120,
            }}
          >
            <Image source={require("../../assets/images/photoNR.png")}></Image>
            <Image
              style={{
                position: "absolute",
                width: 25,
                height: 25,
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
                right: -14,
                bottom: 14,
              }}
              source={require("../../assets/images/icons/addN.png")}
            ></Image>
          </View>
          <TouchableOpacity
            style={{ position: "absolute", top: 22, right: 16 }}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  bgr: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 147,
  },

  home: {
    position: "relative",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    paddingTop: 92,
    borderTopRightRadius: 25,
  },
  header: { alignItems: "center", marginBottom: 33 },

  title: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 30,
  },
  flat: {
    position: "relative",
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  item: { height: 240 },
});

export default ProfileScreen;
