import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

import { Feather } from "@expo/vector-icons";

// import Home from "./Screens/MainScreen/Home";
import RegistrationScreen from "./Screens/AuthScreen/RegistrationScreen";
import LoginScreen from "./Screens/AuthScreen/LoginScreen";
// import CommentsScreen from "./Screens/CommentsScreen";
import CreatePostsScreen from "./Screens/MainScreen/CreatePostsScreen";
// import MapScreen from "./Screens/MapScreen";
import ProfileScreen from "./Screens/MainScreen/ProfileScreen";
import PostsScreen from "./Screens/MainScreen/PostsScreen";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen
          options={{ headerShown: false }}
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen
        options={{
          title: "Публікації",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
          },

          headerTitleAlign: "center",
          headerRight: () => (
            <Feather name="log-out" size={24} color="#BDBDBD" />
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="#BDBDBD" />
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <MainTabs.Screen
        options={{
          title: "Створити публікацію",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          ),
          tabBarLabelStyle: { backgroundColor: "#FF6C00", borderRadius: 20 },
          tabBarShowLabel: false,
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
      <MainTabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="#BDBDBD" />
          ),
        }}
        і
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </MainTabs.Navigator>
  );
};

{
  /* <MainStack.Screen name="CommentsScreen" component={CommentsScreen} />
  <MainStack.Screen name="MapScreen" component={MapScreen} /> */
}
