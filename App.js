import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

const initialState = { name: "", email: "", password: "" };

const App = () => {
  const [state, setState] = useState(initialState);
  const [isLogin, setIsLogin] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [loaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <>
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
            source={require("./assets/images/photoBG.png")}
          >
            {isLogin ? (
              <LoginScreen
                isLogin={{ isLogin, setIsLogin }}
                keyboard={{ keyboardHide, setIsShowKeyboard, isShowKeyboard }}
                state={{ state, setState }}
              />
            ) : (
              <RegistrationScreen
                isLogin={{ isLogin, setIsLogin }}
                keyboard={{ keyboardHide, setIsShowKeyboard, isShowKeyboard }}
                state={{ state, setState }}
              />
            )}
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
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
});

export default App;
