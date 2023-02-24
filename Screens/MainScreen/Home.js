import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const MainTab = createBottomTabNavigator();

import { Feather } from "@expo/vector-icons";

import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { PostsScreen } from "./PostsScreen";

export const Home = ({ navigation, route }) => {
  const { email, name, image } = route.params;
  return (
    <MainTab.Navigator
      initialRouteName={"PostsScreen"}
      screenOptions={({ route }) => ({
        headerStyle: {
          height: 88,
          borderBottomWidth: 1,
          borderColor: "#F6F6F6",
        },
        headerTitleStyle: {
          justifyContent: "flex-end",
          paddingBottom: 11,
          paddingTop: 55,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          color: "#212121",
        },

        tabBarStyle: {
          position: "relative",
          height: 83,
          borderColor: "#F6F6F6",
          borderTopWidth: 1,
          paddingRight: 81,
          paddingLeft: 81,
          paddingTop: 9,
          paddingBottom: 34,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          if (route.name === "ProfileScreen") {
            iconName = "user";
            iconColor = focused ? "#FF6C00" : "#BDBDBD";
          } else if (route.name === "PostsScreen") {
            iconName = "grid";
            iconColor = focused ? "#FF6C00" : "#BDBDBD";
          } else if (route.name === "CreatePostsScreen") {
            iconName = focused ? "plus" : "plus";
            iconColor = focused ? "#212121" : "#ffffff";
          }
          return <Feather name={iconName} size={24} color={iconColor} />;
        },
      })}
    >
      <MainTab.Screen
        initialParams={{ name, email, image }}
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity
              style={{ position: "absolute", bottom: 10, right: 10 }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={({ route, navigation }) => ({
          title: "Створити публікацію",
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ position: "absolute", bottom: 10, left: 10 }}
                onPress={() => navigation.navigate("PostsScreen")}
              >
                <Feather name="arrow-left" size={24} color="#212121" />
              </TouchableOpacity>
            );
          },
          tabBarStyle: {
            height: 0,
            borderTopWidth: 0,
            marginBottom: 5,
          },

          tabBarButton: ({ children }) => {
            const isFocused = navigation.isFocused();
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CreatePostsScreen");
                }}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <View
                  style={{
                    backgroundColor: isFocused ? "#212121" : "#FF6C00",
                    width: isFocused ? 134 : 70,
                    height: isFocused ? 5 : 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {children}
                </View>
              </TouchableOpacity>
            );
          },
        })}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{ name, image }}
        options={{
          title: "Профіль",
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
