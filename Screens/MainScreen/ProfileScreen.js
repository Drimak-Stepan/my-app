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
    nameLocation: "Forrest",
    likes: 2,
    comments: 4,
    location: "Ukraine",
  },
  {
    id: "4116-jfk5-43rh",
    nameLocation: "Forrest",
    likes: 2,
    comments: 4,
    location: "Ukraine",
  },
  {
    id: "4d16-5tt5-4j55",
    nameLocation: "Forrest",
    likes: 2,
    comments: 4,
    location: "Ukraine",
  },
  {
    id: "LG16-ant5-0J25",
    nameLocation: "Forrest",
    likes: 2,
    comments: 4,
    location: "Ukraine",
  },
];

const ProfileScreen = ({ navigation, route }) => {
  const { name, location, nameLocation, imageBG } = route.params;

  const [courses, setCourses] = useState(COURSES);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
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
            <Text style={styles.title}>{name}</Text>
          </View>

          <FlatList
            style={styles.flat}
            data={courses}
            renderItem={({ item }) => (
              <View>
                <View style={styles.item}></View>
                <Text style={styles.itemTitle}>{item.nameLocation}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 32,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 24,
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#FF6C00"
                      />
                      <Text
                        style={{
                          fontFamily: "Roboto-Regular",
                          color: "#212121",
                          fontSize: 16,
                          marginLeft: 6,
                        }}
                      >
                        {item.comments}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Feather name="thumbs-up" size={24} color="#FF6C00" />
                      <Text
                        style={{
                          fontFamily: "Roboto-Regular",
                          color: "#212121",
                          fontSize: 16,
                          marginLeft: 6,
                        }}
                      >
                        {item.likes}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text
                      style={{
                        fontFamily: "Roboto-Regular",
                        color: "#212121",
                        fontSize: 16,
                        marginLeft: 6,
                        textDecorationLine: "underline",
                      }}
                    >
                      {item.location}
                    </Text>
                  </View>
                </View>
              </View>
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
    marginBottom: 129,
  },
  item: {
    backgroundColor: "#F6F6F6",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 16,
    marginBottom: 11,
  },
});

export default ProfileScreen;
