import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { nanoid } from "nanoid";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState([]);
  const { nameLocation, location, namePhoto, finish } = state;

  const { userId, name } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const { statusLoc } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(statusLoc === "granted");
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const loc = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri);
    const location = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };
    setState((prevState) => ({ ...prevState, location }));
  };

  const clearPhoto = () => {
    setCamera(null);
    setPhoto(null);
    setState([]);
  };
  const sendPhoto = () => {
    uploadPostToServer();
    setState([]);
    navigation.navigate("PostsScreen");
  };
  const uploadPostToServer = async () => {
    const photon = await uploadPhotoToServer();
    const createPost = await addDoc(collection(db, "posts"), {
      nameLocation,
      photon,
      location,
      namePhoto,
      userId,
      name,
    });
  };
  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const imagesRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(imagesRef, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );

    return processedPhoto;
  };
  console.log(photo);
  return (
    <View style={styles.container}>
      <Camera style={{ ...styles.takePhoto }} ref={setCamera}>
        {photo && (
          <View
            style={{
              position: "absolute",
              top: -10,
              left: -10,
              borderColor: "#BDBDBD",
              borderWidth: 2,
              borderRadius: 20,
            }}
          >
            <Image
              source={{ uri: photo }}
              style={{ height: 100, width: 100, borderRadius: 17 }}
            />
          </View>
        )}
        {
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              transform: [{ translateX: 140 }, { translateY: 90 }],
            }}
            onPress={takePhoto}
          >
            <FontAwesome
              name="camera"
              size={20}
              color="rgba(255, 255, 255, 1)"
            />
          </TouchableOpacity>
        }
      </Camera>
      <TouchableOpacity style={{ marginBottom: 32 }}>
        <Text style={styles.text}>Загрузити фото</Text>
      </TouchableOpacity>
      <View
        style={{
          marginBottom: 16,
        }}
      >
        <TextInput
          placeholder="Назва..."
          style={styles.input}
          value={namePhoto}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, namePhoto: value }))
          }
        />
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
          value={nameLocation}
          onChangeText={(value) =>
            setState((prevState) => ({
              ...prevState,
              nameLocation: value,
              finish: true,
            }))
          }
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
        style={{
          ...styles.btn,
          backgroundColor: finish ? "#ff6c00" : "#F6F6F6",
        }}
        onPress={sendPhoto}
      >
        <Text
          style={{ ...styles.btnTitle, color: finish ? "#ffffff" : "#BDBDBD" }}
        >
          Опублікувати
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={clearPhoto}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "#F6F6F6",
            width: 70,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
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
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    height: 50,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    backgroundColor: "#ffffff",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    borderRadius: 100,
    marginBottom: 120,
    ...Platform.select({
      ios: { backgroundColor: "#F6F6F6" },
      android: { backgroundColor: "#F6F6F6" },
    }),
  },

  btnTitle: { fontFamily: "Roboto-Regular", fontSize: 16 },
});

export default CreatePostsScreen;
