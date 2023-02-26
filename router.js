import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

import { Home } from "./Screens/MainScreen/Home";
import RegistrationScreen from "./Screens/AuthScreen/RegistrationScreen";
import LoginScreen from "./Screens/AuthScreen/LoginScreen";
import MapScreen from "./Screens/nestedScreens/MapScreen";
import CommentsScreen from "./Screens/nestedScreens/CommentsScreen";

export const useRoute = (isAuth) => {
  console.log(isAuth);
  return (
    <MainStack.Navigator>
      {isAuth ? (
        <>
          <MainStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <MainStack.Screen
            options={{
              title: "Карта",
              headerTitleAlign: "center",
              headerStyle: {
                height: 88,
                borderBottomWidth: 1,
                borderColor: "#F6F6F6",
              },
            }}
            name="MapScreen"
            component={MapScreen}
          />
          <MainStack.Screen
            options={{
              title: "Коментарі",
              headerTitleAlign: "center",
              headerStyle: {
                height: 88,
                borderBottomWidth: 1,
                borderColor: "#F6F6F6",
              },
            }}
            name="CommentsScreen"
            component={CommentsScreen}
          />
        </>
      ) : (
        <>
          <MainStack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <MainStack.Screen
            options={{ headerShown: false }}
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
        </>
      )}
    </MainStack.Navigator>
  );
};
