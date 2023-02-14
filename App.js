import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import * as Font from "expo-font";
import { AppLoading } from "expo";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const nameHandler = (text) => setName(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Alert.alert("Credentials", `${name} + ${password}`);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgr}
          source={require("./assets/images/photoBG.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 116 : 78,
              }}
            >
              <View>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Реєстрація</Text>
                </View>
                <View>
                  <View>
                    <View>
                      <TextInput
                        onFocus={() => {
                          setIsShowKeyboard(true);
                        }}
                        value={name}
                        onChangeText={nameHandler}
                        placeholder="Логін"
                        style={styles.input}
                      />
                    </View>
                    <View>
                      <TextInput
                        onFocus={() => {
                          setIsShowKeyboard(true);
                        }}
                        value={email}
                        onChangeText={emailHandler}
                        placeholder="Адрес електронної пошти"
                        secureTextEntry={true}
                        style={styles.input}
                      />
                    </View>
                    <View>
                      <TextInput
                        onFocus={() => {
                          setIsShowKeyboard(true);
                        }}
                        value={password}
                        onChangeText={passwordHandler}
                        placeholder="Пароль"
                        secureTextEntry={true}
                        style={styles.input}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btn}
                    onPress={keyboardHide}
                  >
                    <Text style={styles.btnTitle}>Зареєструватися</Text>
                  </TouchableOpacity>
                  <View>
                    <Text style={{ color: "#FFF" }}>Вже є акаунт?</Text>
                    <TouchableOpacity>
                      <Text style={{ color: "#FFF" }}>Увійти</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  bgr: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
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
  },

  form: { marginHorizontal: 16 },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    borderRadius: 100,

    ...Platform.select({
      ios: { backgroundColor: "#FF6C00" },
      android: { backgroundColor: "#FF6C00" },
    }),
  },
  btnTitle: { color: "#FFFFFF", fontSize: 16 },

  header: { alignItems: "center", marginBottom: 33 },
  headerTitle: { color: "#fff", fontSize: 30 },
});
