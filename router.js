import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

import { Home } from "./Screens/MainScreen/Home";
import RegistrationScreen from "./Screens/AuthScreen/RegistrationScreen";
import LoginScreen from "./Screens/AuthScreen/LoginScreen";

export const useRoute = (isAuth) => {
  return (
    <MainStack.Navigator
      initialRouteName={isAuth ? "Home" : "RegistrationScreen"}
    >
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
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </MainStack.Navigator>
  );
};
