import { StyleSheet, TouchableOpacity, View, Button, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const MainTab = createBottomTabNavigator();

import { getHeaderTitle } from "@react-navigation/elements";

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

const MyHeader = ({ title }) => {
  return (
    <View
      style={{
        height: 88,
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderColor: "#F6F6F6",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 11,
        position: "relative",
      }}
    >
      <Text
        style={{ fontFamily: "Roboto-Medium", fontSize: 17, color: "#212121" }}
      >
        {title}
      </Text>
    </View>
  );
};

export const Home = ({ navigation, route }) => {
  const { email, name, image } = route.params;
  return (
    <MainTab.Navigator
      initialRouteName={"Публікації"}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 83,
          // borderColor: "#F6F6F6",
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
            iconName = focused ? "" : "user";
            iconColor = focused ? "#BDBDBD" : "#BDBDBD";
            iconSize = focused ? 24 : 24;
          } else if (route.name === "CreatePostsScreen") {
            iconName = focused ? "trash-2" : "plus";
            iconColor = focused ? "#BDBDBD" : "#ffffff";
            iconSize = focused ? 24 : 13;
          } else if (route.name === "PostsScreen") {
            iconName = focused ? "grid" : "";
            iconColor = focused ? "#BDBDBD" : "#BDBDBD";
            iconSize = focused ? 24 : 24;
          }
          return <Feather name={iconName} size={iconSize} color={iconColor} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#FF6C00",
        inactiveTintColor: "#BDBDBD",
      }}
    >
      <MainTab.Screen
        initialParams={{ name, email, image }}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
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
          title: "Створення публікацій",
          headerTitleAlign: "center",
          tabBarButton: (props) => <CustomTabCreatePost {...props} />,
          headerLeft: () => (
            <TouchableOpacity
              style={{ position: "absolute", bottom: 10, left: 10 }}
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <Feather name="arrow-left" size={24} color="#BDBDBD" />
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
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);

            return <MyHeader title={title} navigation={navigation} />;
          },
          cardStyle: { justifyContent: "center" },
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
