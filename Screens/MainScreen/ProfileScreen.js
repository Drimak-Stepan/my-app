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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Feather } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userId, name } = useSelector((state) => state.auth);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsRef = await collection(db, "posts");
    const q = await query(postsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
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
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <View style={styles.item}>
                  <Image
                    source={{ uri: item.photon }}
                    style={{ height: 240, borderRadius: 8 }}
                  />
                </View>
                <Text style={styles.itemTitle}>{item.namePhoto}</Text>
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
                        {"1"}
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
                        {"1"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      navigation.navigate("MapScreen", {
                        location: item.location,
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
            onPress={signOut}
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
    height: 650,
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
