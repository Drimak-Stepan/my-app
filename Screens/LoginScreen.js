import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TextInput,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";

const initialState = { email: "", password: "" };

const LoginScreen = () => {
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocus, setIsFocus] = useState();

  const { password, name } = state;

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setIsShowKeyboard(false);
        }}
      >
        <ImageBackground
          style={styles.bgr}
          source={require("../assets/images/photoBG.png")}
        >
          <View
            style={{
              ...styles.home,
            }}
          >
            <View
              style={{
                ...styles.form,
                width: dimensions,
                marginBottom: isShowKeyboard ? -105 : 144,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Увійти</Text>
              </View>
              <View>
                <TextInput
                  onFocus={() => {
                    setIsFocus(1);
                    setIsShowKeyboard(true);
                  }}
                  value={email}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  placeholder="Адрес електронної пошти"
                  style={
                    isFocus !== 1
                      ? { ...styles.input }
                      : {
                          ...styles.input,
                          borderColor: "#FF6C00",
                          backgroundColor: "#FFFFFF",
                        }
                  }
                />
              </View>
              <View
                style={{
                  position: "relative",
                }}
              >
                <TextInput
                  onFocus={() => {
                    setIsFocus(2);
                    setIsShowKeyboard(true);
                  }}
                  value={password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  placeholder="Пароль"
                  secureTextEntry={true}
                  style={
                    isFocus !== 2
                      ? { ...styles.input }
                      : {
                          ...styles.input,
                          borderColor: "#FF6C00",
                          backgroundColor: "#FFFFFF",
                        }
                  }
                />
                <View>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: "#1B4371",
                        position: "absolute",
                        right: 16,
                        bottom: 30,
                      }}
                    >
                      Показати
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.btn}
                  onPress={keyboardHide}
                >
                  <Text style={styles.btnTitle}>Увійти</Text>
                </TouchableOpacity>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text style={{ color: "#000" }}>Немає акаунту? </Text>
                  <TouchableOpacity>
                    <Text style={{ color: "#000" }}>Зареєструватися</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#212121",
                borderRadius: 100,
                marginHorizontal: 134,
                height: 8,
              }}
            ></View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  home: {
    position: "relative",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
  },

  form: { marginHorizontal: 16 },

  header: { alignItems: "center", marginBottom: 33 },

  headerTitle: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 30,
  },

  input: {
    height: 50,
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    outlineColor: "#FF6C00",
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    borderRadius: 100,
    marginBottom: 16,
    marginTop: 27,
    ...Platform.select({
      ios: { backgroundColor: "#FF6C00" },
      android: { backgroundColor: "#FF6C00" },
    }),
  },

  btnTitle: { fontFamily: "Roboto-Regular", color: "#FFFFFF", fontSize: 16 },
});

export default LoginScreen;
