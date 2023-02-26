import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Text,
} from "react-native";

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { photo, postId } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { name } = useSelector((state) => state.auth);

  const onSubmit = async () => {
    const docRef = await addDoc(collection(db, `posts/${postId}`, "comments"), {
      comment,
      name,
    });
    Keyboard.dismiss();
    setComment("");
  };

  const getAllPost = async () => {
    const querySnapshot = await getDocs(
      collection(db, `posts/${postId}/comments`)
    );
    setAllComments(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image
          source={{ uri: photo }}
          style={{ height: 240, borderRadius: 8 }}
        />
      </View>
      <SafeAreaView style={styles.commentsListWrap}>
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            let isEven = index % 2 === 0;
            return (
              <View
                style={{
                  ...styles.itemWrap,
                  flexDirection: isEven ? "row" : "row-reverse",
                }}
              >
                <View>
                  <Text>{item.name}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: isEven ? 16 : 0,
                    marginRight: isEven ? 0 : 16,
                    ...styles.commentWrap,
                  }}
                >
                  <Text style={styles.commentText}>{item.comment}</Text>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.comment}
        onPress={onSubmit}
      >
        <TextInput
          value={comment}
          onChange={({ nativeEvent: { text } }) => {
            setComment(text);
          }}
          placeholder="Коментувати..."
          style={styles.input}
        />
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
  },
  commentsListWrap: {
    flex: 1,
    marginTop: 32,
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

  itemWrap: {
    marginBottom: 24,
  },

  commentWrap: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
  },

  input: { fontFamily: "Roboto-Medium", color: "#212121", fontSize: 16 },
});

export default CommentsScreen;
