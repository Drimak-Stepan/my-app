import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.bgr}>
      <View
        style={{
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              width: 60,
              height: 60,
            }}
          >
            <Image
              // source={{ uri: image }}
              source={require("../../assets/images/photoNR.png")}
              style={{
                width: "100%",
                flex: 1,
                resizeMode: "cover",
                borderRadius: 16,
              }}
            />
          </View>
          <View
            style={{
              marginLeft: 8,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                fontSize: 13,
                lineHeight: 15,
                color: "#212121",
              }}
            >
              {"name"}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 11,
                lineHeight: 13,
                color: "#212121",
              }}
            >
              {"email"}
            </Text>
          </View>
        </View>
        {posts && (
          <SafeAreaView>
            <FlatList
              style={styles.flat}
              data={posts}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.item}>
                    <Image
                      source={{ uri: item.photo }}
                      style={{ height: 240, borderRadius: 8 }}
                    />
                  </View>
                  <Text style={styles.itemTitle}>{item.namePhoto}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: 34,
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
                        onPress={() => {
                          navigation.navigate("CommentsScreen", {
                            photo: item.photo,
                          });
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
                          1
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        const locationMap = item.location;
                        navigation.navigate("MapScreen", {
                          locationMap,
                        });
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
                        {item.nameLocation}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgr: { flex: 1, backgroundColor: "#ffffff" },

  container: {
    flexDirection: "row",
    paddingTop: 32,
    paddingBottom: 32,
  },
  flat: {
    position: "relative",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 250,
  },
  item: {
    backgroundColor: "#F6F6F6",
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
