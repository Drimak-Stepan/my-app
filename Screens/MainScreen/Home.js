import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const MainTab = createBottomTabNavigator();

import { Feather } from "@expo/vector-icons";

import CommentsScreen from "../CommentsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import MapScreen from "../MapScreen";
import ProfileScreen from "./ProfileScreen";
import { PostsScreen } from "./PostsScreen";

const CustomTabCreatePost = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: "#FF6C00",
          width: 70,
          height: 40,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export const Home = ({ navigation, route }) => {
  const { email, name, image } = route.params;
  return (
    <MainTab.Navigator
      initialRouteName={"Публікації"}
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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          let iconSize;
          if (route.name === "ProfileScreen") {
            iconName = focused ? "plus" : "user";
            iconColor = focused ? "#BDBDBD" : "#BDBDBD";
            iconSize = focused ? 24 : 24;
          } else if (route.name === "CreatePostsScreen") {
            iconName = focused ? "trash-2" : "plus";
            iconColor = focused ? "#BDBDBD" : "#ffffff";
            iconSize = focused ? 24 : 13;
          } else if (route.name === "PostsScreen") {
            iconName = focused ? "grid" : "grid";
            iconColor = focused ? "#BDBDBD" : "#BDBDBD";
            iconSize = focused ? 24 : 24;
          }
          return <Feather name={iconName} size={iconSize} color={iconColor} />;
        },
        // tabBarOptions: {
        //   activeTintColor: "#FF6C00",
        //   inactiveTintColor: "#BDBDBD",
        // },
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
        options={{
          title: "Створити публікацію",
          headerLeft: () => (
            <TouchableOpacity
              style={{ position: "absolute", bottom: 10, left: 10 }}
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
          ),

          tabBarButton: ({ props, children }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreatePostsScreen")}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: "#FF6C00",
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {children}
              </View>
            </TouchableOpacity>
          ),
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Профіль",
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
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
