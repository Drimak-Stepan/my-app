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
} from "react-native";

const LoginScreen = ({ state, keyboard, isLogin }) => {
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [isFocus, setIsFocus] = useState();

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
    <View
      style={{
        ...styles.home,
      }}
    >
      <View
        style={{
          ...styles.form,
          width: dimensions,
          marginBottom: keyboard.isShowKeyboard ? -105 : 144,
        }}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Увійти</Text>
        </View>
        <View>
          <TextInput
            onFocus={() => {
              setIsFocus(1);
              keyboard.setIsShowKeyboard(true);
            }}
            value={state.state.email}
            onChangeText={(value) =>
              state.setState((prevState) => ({
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
              keyboard.setIsShowKeyboard(true);
            }}
            value={state.state.password}
            onChangeText={(value) =>
              state.setState((prevState) => ({
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
            onPress={keyboard.keyboardHide}
          >
            <Text style={styles.btnTitle}>Увійти</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: "#000" }}>Немає акаунту? </Text>
            <TouchableOpacity onPress={() => isLogin.setIsLogin(false)}>
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
  );
};

const styles = StyleSheet.create({
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
